'use client';

import { useState, useRef } from 'react';
import { useUploadStore } from '../../stores/upload.store';
import { UploadCloud } from 'lucide-react';

export function UploadDropzone() {
  const { setFile, setError } = useUploadStore();
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Limit: 20GB
    const MAX_SIZE = 20 * 1024 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setError('File is too large. Maximum allowed size is 20GB.');
      return;
    }

    if (!file.type.startsWith('video/')) {
      setError('Invalid file type. Please upload a valid video file.');
      return;
    }

    setFile(file);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`dropzone ${dragActive ? 'active' : ''}`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={onButtonClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple={false}
        onChange={handleChange}
        accept="video/*"
        style={{ display: 'none' }}
      />
      <UploadCloud size={48} className="dropzone-icon" />
      <h3 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: 600 }}>
        Drag and drop your video file here
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
        or click to browse from files
      </p>
      <button type="button" className="btn btn-secondary" style={{ pointerEvents: 'none' }}>
        Select File
      </button>
      <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '16px' }}>
        Supports files up to 20GB (MP4, WEBM, MOV)
      </span>
    </div>
  );
}
