'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { api } from '../../../lib/api';
import { VideoPlayer } from '../../../components/video/VideoPlayer';
import { io, Socket } from 'socket.io-client';
import { ArrowLeft, Clock, Monitor, Tag, Film, Calendar, ShieldAlert, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface VideoDetails {
  id: string;
  originalFileName: string;
  title: string | null;
  description: string | null;
  status: string;
  processingProgress: number;
  thumbnailUrl: string | null;
  playbackUrl: string | null;
  duration: number | null;
  width: number | null;
  height: number | null;
  fps: number | null;
  bitrate: number | null;
  codec: string | null;
  createdAt: string;
}

export default function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: videoId } = React.use(params);
  const [video, setVideo] = useState<VideoDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVideoDetails();
  }, [videoId]);

  // Handle Socket.IO connection for real-time progress if video is not ready yet
  useEffect(() => {
    let socket: Socket | null = null;

    if (video && video.status !== 'READY' && video.status !== 'FAILED') {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      socket = io(`${apiBaseUrl}/video-processing`, {
        transports: ['websocket'],
      });

      socket.on('connect', () => {
        console.log('Watch page joined room:', videoId);
        socket?.emit('join-video', { videoId });
      });

      socket.on('video.processing.updated', (data: any) => {
        console.log('Watch page received progress:', data);
        setVideo((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            status: data.status || prev.status,
            processingProgress: data.progress !== undefined ? data.progress : prev.processingProgress,
            playbackUrl: data.playbackUrl || prev.playbackUrl,
            thumbnailUrl: data.thumbnailUrl || prev.thumbnailUrl,
          };
        });
      });

      socket.on('disconnect', () => {
        console.log('Watch page socket disconnected');
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [video?.status, videoId]);

  const fetchVideoDetails = async () => {
    try {
      const res = await api.get(`/videos/${videoId}`);
      setVideo(res.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        'Could not load video. Please verify the ID or authentication session.'
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number | null) => {
    if (seconds === null) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatBitrate = (bits: number | null) => {
    if (!bits) return 'N/A';
    return (bits / 1000000).toFixed(2) + ' Mbps';
  };

  const getStatusMessage = () => {
    if (!video) return '';
    switch (video.status) {
      case 'INITIATING':
        return 'Initiating upload session...';
      case 'UPLOADING':
        return 'Uploading video chunks to storage...';
      case 'UPLOADED':
        return 'Waiting to start processing...';
      case 'PROCESSING':
        return 'Worker initializing transcode environment...';
      case 'EXTRACTING_METADATA':
        return 'Extracting codec and resolution structures (10%)';
      case 'GENERATING_THUMBNAIL':
        return 'Extracting thumbnail frame capture (30%)';
      case 'GENERATING_HLS':
        return `Transcoding multi-bitrate HLS adaptive segments (${video.processingProgress}%)`;
      default:
        return 'Transcoding...';
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <Loader2 className="spin" size={40} style={{ color: 'var(--primary)' }} />
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="app-container" style={{ textAlign: 'center', marginTop: '100px' }}>
        <ShieldAlert size={48} style={{ color: 'var(--error)', marginBottom: '16px', margin: '0 auto' }} />
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>Error Loading Video</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '24px' }}>{error || 'Video not found'}</p>
        <Link href="/" className="btn btn-secondary">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div style={{ marginBottom: '24px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px', alignItems: 'start' }}>
        {/* Left Column: Player / Processing Banner */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {video.status === 'READY' && video.playbackUrl ? (
            <VideoPlayer src={video.playbackUrl} poster={video.thumbnailUrl || undefined} />
          ) : video.status === 'FAILED' ? (
            <div
              style={{
                aspectRatio: '16/9',
                background: 'rgba(239, 68, 68, 0.05)',
                border: '1px solid var(--error)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                textAlign: 'center',
              }}
            >
              <ShieldAlert size={48} style={{ color: 'var(--error)', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Transcoding Failed</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                FFmpeg failed to transcode this video. Ensure it is a valid, uncorrupted MP4/MOV source file.
              </p>
            </div>
          ) : (
            <div
              style={{
                aspectRatio: '16/9',
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                textAlign: 'center',
              }}
            >
              <Loader2 className="spin" size={40} style={{ color: 'var(--primary)', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                Transcoding in Progress
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                {getStatusMessage()}
              </p>

              <div className="progress-container" style={{ maxWidth: '360px' }}>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${video.processingProgress}%` }} />
                </div>
              </div>
            </div>
          )}

          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
              {video.title || video.originalFileName}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6' }}>
              {video.description || 'No description provided.'}
            </p>
          </div>
        </div>

        {/* Right Column: Video Specs Card */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, paddingBottom: '12px', borderBottom: '1px solid var(--card-border)' }}>
            Video Properties
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Clock size={16} style={{ color: 'var(--text-muted)' }} />
              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Duration</p>
                <p style={{ fontSize: '14px', fontWeight: 600 }}>{formatDuration(video.duration)}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Monitor size={16} style={{ color: 'var(--text-muted)' }} />
              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Dimensions</p>
                <p style={{ fontSize: '14px', fontWeight: 600 }}>
                  {video.width && video.height ? `${video.width} x ${video.height}` : 'N/A'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Tag size={16} style={{ color: 'var(--text-muted)' }} />
              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Codec & FPS</p>
                <p style={{ fontSize: '14px', fontWeight: 600 }}>
                  {video.codec ? `${video.codec.toUpperCase()} @ ${video.fps || 0} fps` : 'N/A'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Film size={16} style={{ color: 'var(--text-muted)' }} />
              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Bitrate</p>
                <p style={{ fontSize: '14px', fontWeight: 600 }}>{formatBitrate(video.bitrate)}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Calendar size={16} style={{ color: 'var(--text-muted)' }} />
              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Uploaded</p>
                <p style={{ fontSize: '14px', fontWeight: 600 }}>
                  {new Date(video.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
