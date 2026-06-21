'use client';

import { useState, useEffect } from 'react';
import { AuthPanel } from '../components/auth/AuthPanel';
import { UploadModal } from '../components/upload/UploadModal';
import { api } from '../lib/api';
import { LogOut, Film, Monitor, Clock, PlayCircle } from 'lucide-react';
import Link from 'next/link';

interface VideoCatalogItem {
  id: string;
  title: string | null;
  originalFileName: string;
  thumbnailUrl: string | null;
  duration: number | null;
  width: number | null;
  height: number | null;
  codec: string | null;
  createdAt: string;
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [videos, setVideos] = useState<VideoCatalogItem[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);

  // Check auth status on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
      fetchVideos();
    }
    setCheckingAuth(false);
  }, []);

  const fetchVideos = async () => {
    setLoadingVideos(true);
    try {
      const res = await api.get('/videos');
      setVideos(res.data.videos);
    } catch (err) {
      console.error('Failed to fetch videos catalog:', err);
    } finally {
      setLoadingVideos(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    setVideos([]);
  };

  const formatDuration = (seconds: number | null) => {
    if (seconds === null) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getResolutionLabel = (width: number | null, height: number | null) => {
    if (!width || !height) return 'SD';
    if (height >= 1080) return '1080p Full HD';
    if (height >= 720) return '720p HD';
    return `${width}x${height}`;
  };

  if (checkingAuth) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <div className="spin" style={{ width: '40px', height: '40px', border: '4px solid var(--primary)', borderRadius: '50%', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPanel onAuthSuccess={() => { setIsAuthenticated(true); fetchVideos(); }} />;
  }

  return (
    <div className="app-container">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Film size={28} style={{ color: 'var(--primary)' }} />
          <span className="logo-text">AetherMedia</span>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary">
          <LogOut size={16} /> Sign Out
        </button>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        {/* Upload Section */}
        <section>
          <UploadModal />
        </section>

        {/* Video Gallery Section */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>
                Video Catalog
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                Browse transcoded adaptive HLS videos hosted directly on Cloudflare R2.
              </p>
            </div>
            <button onClick={fetchVideos} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              Refresh Catalog
            </button>
          </div>

          {loadingVideos ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
              <div className="spin" style={{ width: '32px', height: '32px', border: '3px solid var(--primary)', borderRadius: '50%', borderTopColor: 'transparent' }} />
            </div>
          ) : videos.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 20px',
                background: 'rgba(255,255,255,0.01)',
                border: '1px dashed var(--card-border)',
                borderRadius: '16px',
              }}
            >
              <Film size={40} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>No Videos Available</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '320px', margin: '0 auto' }}>
                Upload and transcode video files above to populate the adaptive streaming gallery.
              </p>
            </div>
          ) : (
            <div className="video-grid">
              {videos.map((video) => (
                <Link href={`/watch/${video.id}`} key={video.id} className="glass-panel video-card">
                  <div className="video-thumbnail-wrapper">
                    {video.thumbnailUrl ? (
                      <img
                        src={video.thumbnailUrl}
                        alt={video.originalFileName}
                        className="video-thumbnail"
                      />
                    ) : (
                      <div
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: '#1a1d24',
                        }}
                      >
                        <Film size={32} style={{ color: 'var(--text-muted)' }} />
                      </div>
                    )}
                    <span className="video-duration">{formatDuration(video.duration)}</span>
                    <div
                      style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,0.3)',
                        opacity: 0,
                        transition: 'opacity 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      className="play-hover"
                    >
                      <PlayCircle size={44} style={{ color: '#fff' }} />
                    </div>
                  </div>

                  <div className="video-info">
                    <h3 className="video-title">{video.title || video.originalFileName}</h3>
                    <div className="video-meta" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} /> {formatDuration(video.duration)}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Monitor size={12} /> {getResolutionLabel(video.width, video.height)}
                        </span>
                      </div>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Codec: {video.codec || 'N/A'} • Uploaded {new Date(video.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
