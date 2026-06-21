'use client';

import { useEffect } from 'react';
import { useUploadStore } from '../../stores/upload.store';
import { useMultipartUpload } from '../../hooks/useMultipartUpload';
import { UploadDropzone } from './UploadDropzone';
import { io, Socket } from 'socket.io-client';
import { Loader2, CheckCircle2, AlertCircle, Play } from 'lucide-react';
import Link from 'next/link';

export function UploadModal() {
  const {
    selectedFile,
    videoId,
    status,
    uploadProgress,
    processingProgress,
    thumbnailUrl,
    playbackUrl,
    error,
    setStatus,
    setProcessingProgress,
    setUrls,
    reset,
  } = useUploadStore();

  const { uploadFile, cancelUpload, isUploading } = useMultipartUpload();

  // Handle WebSocket updates for video transcoding progress
  useEffect(() => {
    let socket: Socket | null = null;

    // Start listening once the upload completes or shifts to background processing
    if (videoId && (status === 'UPLOADED' || status === 'PROCESSING' || status.startsWith('GENERATING') || status.startsWith('EXTRACTING'))) {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      socket = io(`${apiBaseUrl}/video-processing`, {
        transports: ['websocket'],
      });

      socket.on('connect', () => {
        console.log('WebSocket connected. Joining room for video:', videoId);
        socket?.emit('join-video', { videoId });
      });

      socket.on('video.processing.updated', (data: any) => {
        console.log('Received socket progress update:', data);
        if (data.status) {
          setStatus(data.status);
        }
        if (data.progress !== undefined) {
          setProcessingProgress(data.progress);
        }
        if (data.playbackUrl || data.thumbnailUrl) {
          setUrls(data.playbackUrl || null, data.thumbnailUrl || null);
        }
      });

      socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [videoId, status, setStatus, setProcessingProgress, setUrls]);

  const getStatusLabel = () => {
    switch (status) {
      case 'INITIATING':
        return 'Initiating secure R2 upload session...';
      case 'UPLOADING':
        return `Uploading video parts to Cloudflare R2 (${uploadProgress}%)`;
      case 'UPLOADED':
        return 'Upload complete! Starting transcoder jobs...';
      case 'PROCESSING':
        return 'Worker picked up video. Preparing pipeline...';
      case 'EXTRACTING_METADATA':
        return 'Extracting stream metadata & bitrates (10%)';
      case 'GENERATING_THUMBNAIL':
        return 'Generating video thumbnail poster (30%)';
      case 'GENERATING_HLS':
        return `Generating adaptive multi-bitrate HLS streams (${processingProgress}%)`;
      case 'READY':
        return 'Video is ready for adaptive streaming (100%)';
      case 'FAILED':
        return 'Processing pipeline failed';
      default:
        return 'Idle';
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="glass-panel" style={{ width: '100%', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>
          Upload Media File
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Publish video content for multi-bitrate adaptive viewing.
        </p>
      </div>

      {status === 'IDLE' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <UploadDropzone />
          {selectedFile && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.03)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid var(--card-border)',
              }}
            >
              <div>
                <p style={{ fontWeight: 600, fontSize: '15px' }}>{selectedFile.name}</p>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  {formatBytes(selectedFile.size)}
                </p>
              </div>
              <button onClick={uploadFile} className="btn btn-primary">
                Start Upload
              </button>
            </div>
          )}
        </div>
      )}

      {(status === 'INITIATING' ||
        status === 'UPLOADING' ||
        status === 'UPLOADED' ||
        status.startsWith('GENERATING') ||
        status.startsWith('EXTRACTING') ||
        status === 'PROCESSING') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', padding: '20px 0' }}>
          <Loader2 size={40} className="spin" style={{ color: 'var(--primary)' }} />
          
          <div style={{ textAlign: 'center', width: '100%' }}>
            <p style={{ fontWeight: 600, fontSize: '16px', marginBottom: '8px' }}>
              {getStatusLabel()}
            </p>
            {selectedFile && (
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                {selectedFile.name} ({formatBytes(selectedFile.size)})
              </p>
            )}

            <div className="progress-container">
              <div className="progress-header">
                <span>
                  {status === 'UPLOADING' ? 'Uploading to R2' : 'Processing on Worker'}
                </span>
                <span>
                  {status === 'UPLOADING' ? `${uploadProgress}%` : `${processingProgress}%`}
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${status === 'UPLOADING' ? uploadProgress : processingProgress}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {status === 'UPLOADING' && (
            <button onClick={cancelUpload} className="btn btn-danger">
              Cancel Upload
            </button>
          )}
        </div>
      )}

      {status === 'READY' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', padding: '20px 0', textAlign: 'center' }}>
          <CheckCircle2 size={48} style={{ color: 'var(--success)' }} />
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
              Upload & Transcode Successful!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
              Your video has been partitioned into HLS playlists and is ready for playback.
            </p>
          </div>

          {thumbnailUrl && (
            <div
              style={{
                width: '100%',
                maxWidth: '320px',
                aspectRatio: '16/9',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid var(--card-border)',
                marginBottom: '16px',
              }}
            >
              <img
                src={thumbnailUrl}
                alt="Video Thumbnail"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={reset} className="btn btn-secondary">
              Upload Another
            </button>
            {videoId && (
              <Link href={`/watch/${videoId}`} className="btn btn-primary">
                <Play size={16} /> Watch Video
              </Link>
            )}
          </div>
        </div>
      )}

      {status === 'FAILED' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', padding: '20px 0', textAlign: 'center' }}>
          <AlertCircle size={48} style={{ color: 'var(--error)' }} />
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
              Upload or Processing Failed
            </h3>
            <p style={{ color: 'var(--error)', fontSize: '14px', fontWeight: 500, marginBottom: '24px' }}>
              {error || 'An error occurred during video transcoding. Please check the logs.'}
            </p>
          </div>
          <button onClick={reset} className="btn btn-primary">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
