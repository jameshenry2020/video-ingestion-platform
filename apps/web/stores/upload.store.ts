import { create } from 'zustand';

export type UploadStatus =
  | 'IDLE'
  | 'INITIATING'
  | 'UPLOADING'
  | 'UPLOADED'
  | 'PROCESSING'
  | 'EXTRACTING_METADATA'
  | 'GENERATING_THUMBNAIL'
  | 'GENERATING_HLS'
  | 'READY'
  | 'FAILED';

interface UploadState {
  selectedFile: File | null;
  videoId: string | null;
  uploadId: string | null;
  objectKey: string | null;
  status: UploadStatus;
  uploadProgress: number;
  processingProgress: number;
  thumbnailUrl: string | null;
  playbackUrl: string | null;
  error: string | null;

  setFile: (file: File | null) => void;
  setUploadInfo: (videoId: string, uploadId: string, objectKey: string) => void;
  setStatus: (status: UploadStatus) => void;
  setUploadProgress: (progress: number) => void;
  setProcessingProgress: (progress: number) => void;
  setUrls: (playbackUrl: string | null, thumbnailUrl: string | null) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  selectedFile: null,
  videoId: null,
  uploadId: null,
  objectKey: null,
  status: 'IDLE',
  uploadProgress: 0,
  processingProgress: 0,
  thumbnailUrl: null,
  playbackUrl: null,
  error: null,

  setFile: (file) => set({ selectedFile: file, error: null }),
  setUploadInfo: (videoId, uploadId, objectKey) => set({ videoId, uploadId, objectKey }),
  setStatus: (status) => set({ status }),
  setUploadProgress: (uploadProgress) => set({ uploadProgress }),
  setProcessingProgress: (processingProgress) => set({ processingProgress }),
  setUrls: (playbackUrl, thumbnailUrl) => set({ playbackUrl, thumbnailUrl }),
  setError: (error) => set({ error, status: error ? 'FAILED' : 'IDLE' }),
  reset: () =>
    set({
      selectedFile: null,
      videoId: null,
      uploadId: null,
      objectKey: null,
      status: 'IDLE',
      uploadProgress: 0,
      processingProgress: 0,
      thumbnailUrl: null,
      playbackUrl: null,
      error: null,
    }),
}));
