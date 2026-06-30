'use client';

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Clean up any existing Hls instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        maxMaxBufferLength: 30, // Cap buffer at 30 seconds to optimize memory
        enableWorker: true,
        lowLatencyMode: true,
      });

      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('HLS manifest parsed, ready to play.');
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.warn('Fatal network error encountered, trying to recover...');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.warn('Fatal media error encountered, trying to recover...');
              hls.recoverMediaError();
              break;
            default:
              console.error('Fatal HLS error, destroying player', data);
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native support (Safari/iOS)
      video.src = src;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src]);

  return (
    <div className={cn("relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-border shadow-md", className)}>
      <video
        ref={videoRef}
        poster={poster}
        controls
        playsInline
        className="w-full h-full"
      />
    </div>
  );
}
