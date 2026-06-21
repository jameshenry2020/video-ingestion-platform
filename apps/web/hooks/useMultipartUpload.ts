import { useState, useRef } from 'react';
import { api } from '../lib/api';
import { useUploadStore } from '../stores/upload.store';
import axios from 'axios';

interface UploadPartInfo {
  ETag: string;
  PartNumber: number;
}

export function useMultipartUpload() {
  const {
    selectedFile,
    setUploadInfo,
    setStatus,
    setUploadProgress,
    setError,
    reset,
  } = useUploadStore();

  const [isUploading, setIsUploading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const uploadFile = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setStatus('INITIATING');
    setUploadProgress(0);
    abortControllerRef.current = new AbortController();

    const fileName = selectedFile.name;
    const fileSize = selectedFile.size;
    const mimeType = selectedFile.type;

    try {
      let videoId = '';
      let uploadId = '';
      let objectKey = '';
      let chunkSize = 10 * 1024 * 1024; // Default 10MB
      let completedParts: UploadPartInfo[] = [];
      let startPartNumber = 1;

      // Check if we have an existing session in localStorage for this file to resume
      const storageKey = `upload_session_${fileName}_${fileSize}`;
      const cachedSessionId = localStorage.getItem(storageKey);

      if (cachedSessionId) {
        try {
          // Check if session is still active and get uploaded parts from R2
          const sessionRes = await api.get(`/uploads/session/${cachedSessionId}`);
          const sessionData = sessionRes.data;

          videoId = cachedSessionId;
          uploadId = sessionData.uploadId;
          objectKey = sessionData.objectKey;
          chunkSize = sessionData.chunkSize;
          completedParts = sessionData.parts.map((p: any) => ({
            ETag: p.ETag.replace(/"/g, ''), // S3/R2 returns ETags with double quotes
            PartNumber: p.PartNumber,
          }));

          setUploadInfo(videoId, uploadId, objectKey);
          setStatus('UPLOADING');
          console.log(`Resuming session: ${videoId}. Already uploaded parts:`, completedParts.map(p => p.PartNumber));
        } catch (err) {
          // Cache invalid or session expired. Remove it and start fresh.
          localStorage.removeItem(storageKey);
        }
      }

      // If no valid session was resumed, initiate a new session
      if (!videoId) {
        const initRes = await api.post('/uploads/initiate', {
          fileName,
          fileSize,
          mimeType,
        });

        videoId = initRes.data.videoId;
        uploadId = initRes.data.uploadId;
        objectKey = initRes.data.objectKey;
        chunkSize = initRes.data.chunkSize;

        // Cache the session id
        localStorage.setItem(storageKey, videoId);
        setUploadInfo(videoId, uploadId, objectKey);
      }

      setStatus('UPLOADING');

      const totalParts = Math.ceil(fileSize / chunkSize);
      const partsToUpload: number[] = [];

      // Determine which parts still need to be uploaded
      const completedPartNumbers = new Set(completedParts.map((p) => p.PartNumber));
      for (let p = 1; p <= totalParts; p++) {
        if (!completedPartNumbers.has(p)) {
          partsToUpload.push(p);
        }
      }

      // Keep track of fine-grained progress per part
      const progressMap = new Map<number, number>();
      
      // Seed completed parts with 100% progress
      completedParts.forEach((p) => {
        progressMap.set(p.PartNumber, chunkSize);
      });

      const updateOverallProgress = () => {
        let totalUploadedBytes = 0;
        for (let p = 1; p <= totalParts; p++) {
          const bytes = progressMap.get(p) || 0;
          totalUploadedBytes += bytes;
        }
        // Caps at 99% during upload, set to 100% on complete
        const percent = Math.min(99, Math.floor((totalUploadedBytes / fileSize) * 100));
        setUploadProgress(percent);
      };

      // Set initial progress
      updateOverallProgress();

      // Parallel chunk uploading logic with concurrency limit of 5
      const CONCURRENCY_LIMIT = 5;
      let activeUploads = 0;
      let partIndex = 0;

      const uploadPart = async (partNumber: number): Promise<UploadPartInfo> => {
        // Step 1: Get presigned URL
        const presignedRes = await api.post('/uploads/presigned-part', {
          videoId,
          uploadId,
          partNumber,
        });
        const signedUrl = presignedRes.data.url;

        // Step 2: Slice the file
        const start = (partNumber - 1) * chunkSize;
        const end = Math.min(start + chunkSize, fileSize);
        const chunkBlob = selectedFile.slice(start, end);

        // Step 3: Put object directly to Cloudflare R2
        let retryCount = 0;
        const maxRetries = 3;

        while (retryCount <= maxRetries) {
          try {
            const uploadRes = await axios.put(signedUrl, chunkBlob, {
              headers: {
                'Content-Type': mimeType,
              },
              onUploadProgress: (progressEvent) => {
                if (progressEvent.loaded) {
                  progressMap.set(partNumber, progressEvent.loaded);
                  updateOverallProgress();
                }
              },
              signal: abortControllerRef.current?.signal,
            });

            const ETag = uploadRes.headers.etag?.replace(/"/g, '') || '';
            
            // Notify backend that this part is completed so DB counts remain accurate
            await api.post('/uploads/part-complete', {
              videoId,
              partNumber,
            });

            return { ETag, PartNumber: partNumber };
          } catch (err: any) {
            if (axios.isCancel(err)) {
              throw err; // Aborted
            }
            retryCount++;
            if (retryCount > maxRetries) {
              throw new Error(`Failed to upload chunk ${partNumber} after ${maxRetries} retries: ${err.message}`);
            }
            // Wait 1s before retrying
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
        throw new Error(`Failed to upload chunk ${partNumber}`);
      };

      // Process queue with concurrency limit
      const results = await new Promise<UploadPartInfo[]>((resolve, reject) => {
        const errors: Error[] = [];
        const activeParts: Promise<void>[] = [];

        const next = () => {
          if (abortControllerRef.current?.signal.aborted) {
            return reject(new Error('Upload aborted'));
          }

          if (partIndex >= partsToUpload.length) {
            if (activeUploads === 0) {
              resolve(completedParts);
            }
            return;
          }

          const partNumber = partsToUpload[partIndex++];
          activeUploads++;

          const task = uploadPart(partNumber)
            .then((result) => {
              completedParts.push(result);
              progressMap.set(partNumber, chunkSize); // Ensure full size is set
              updateOverallProgress();
            })
            .catch((err) => {
              errors.push(err);
            })
            .finally(() => {
              activeUploads--;
              next();
            });

          activeParts.push(task);
        };

        for (let i = 0; i < Math.min(CONCURRENCY_LIMIT, partsToUpload.length); i++) {
          next();
        }
      });

      // Step 4: Finalize multipart upload on NestJS backend
      setStatus('PROCESSING');
      setUploadProgress(100);

      await api.post('/uploads/complete', {
        videoId,
        uploadId,
        parts: results,
      });

      setStatus('UPLOADED');
      // Clean up localStorage cache since upload is successfully done
      localStorage.removeItem(storageKey);
    } catch (err: any) {
      if (err.message === 'Upload aborted') {
        setStatus('IDLE');
      } else {
        this.logger?.error ? this.logger.error(err.message) : console.error(err);
        setError(err.message || 'An error occurred during upload');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const cancelUpload = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsUploading(false);
    setStatus('IDLE');
  };

  return {
    uploadFile,
    cancelUpload,
    isUploading,
  };
}
