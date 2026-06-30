'use client';

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { cn } from "@/lib/utils";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Settings, 
  Loader2,
  Gauge
} from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  // Control states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);

  // Settings states
  const [showSettings, setShowSettings] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'main' | 'quality' | 'speed'>('main');
  const [levels, setLevels] = useState<{ index: number; name: string }[]>([]);
  const [currentQuality, setCurrentQuality] = useState(-1); // -1 is Auto
  const [hasHlsLoaded, setHasHlsLoaded] = useState(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset and mount Hls.js or native fallback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset local state
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setLevels([]);
    setCurrentQuality(-1);
    setHasHlsLoaded(false);

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        maxMaxBufferLength: 30,
        enableWorker: true,
        lowLatencyMode: true,
      });

      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setHasHlsLoaded(true);
        // Map unique resolution levels
        const mappedLevels = hls.levels.map((level, idx) => ({
          index: idx,
          name: level.height ? `${level.height}p` : `Level ${idx + 1}`,
        }));
        setLevels(mappedLevels);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Apple HLS support
      video.src = src;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src]);

  // Sync state with HTML5 Video Element events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration || 0);
    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
    };
  }, []);

  // Controls overlay auto-hide logic
  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
        setShowSettings(false);
      }
    }, 2500);
  };

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  const handleMouseMove = () => {
    resetControlsTimeout();
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch((e) => console.warn('Playback interrupted:', e));
    }
    resetControlsTimeout();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const seekVal = parseFloat(e.target.value);
    video.currentTime = seekVal;
    setCurrentTime(seekVal);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const volVal = parseFloat(e.target.value);
    video.volume = volVal;
    setVolume(volVal);
    if (volVal > 0 && isMuted) {
      video.muted = false;
      setIsMuted(false);
    } else if (volVal === 0 && !isMuted) {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const selectPlaybackSpeed = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSettings(false);
  };

  const selectQuality = (levelIndex: number) => {
    if (!hlsRef.current) return;
    hlsRef.current.currentLevel = levelIndex;
    setCurrentQuality(levelIndex);
    setShowSettings(false);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((e) => console.error('Failed to trigger fullscreen:', e));
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  // If HLS isn't supported directly (e.g., Safari iOS) or Hls fails to initialize,
  // we fallback to native controls inside Safari which handles adaptive streaming natively.
  const isSafariFallback = !Hls.isSupported();

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className={cn(
        "relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-border shadow-2xl group select-none", 
        className
      )}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        poster={poster}
        playsInline
        onClick={togglePlay}
        controls={isSafariFallback}
        className="w-full h-full cursor-pointer object-contain"
      />

      {/* Custom Controls Overlay (Hidden on Safari Fallback as native controls are requested there) */}
      {!isSafariFallback && (
        <>
          {/* Buffering Indicator */}
          {isBuffering && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/25 backdrop-blur-[2px] pointer-events-none transition-opacity">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
            </div>
          )}

          {/* Controls Bar */}
          <div 
            className={cn(
              "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-12 flex flex-col gap-3 transition-opacity duration-300 ease-in-out z-10",
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            {/* Custom Progress/Timeline Slider */}
            <div className="flex items-center gap-3 w-full group/timeline">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-white/20 hover:h-1.5 rounded-lg appearance-none cursor-pointer accent-primary transition-all duration-150 outline-none"
                style={{
                  background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.2) ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>

            {/* Left and Right Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Play/Pause Button */}
                <button 
                  onClick={togglePlay} 
                  className="text-white hover:text-primary transition-colors focus:outline-none"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5 fill-current" />
                  ) : (
                    <Play className="h-5 w-5 fill-current" />
                  )}
                </button>

                {/* Volume Section */}
                <div className="flex items-center gap-2 group/volume">
                  <button 
                    onClick={toggleMute} 
                    className="text-white hover:text-primary transition-colors focus:outline-none"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-0 overflow-hidden group-hover/volume:w-16 h-1 bg-white/20 rounded appearance-none cursor-pointer accent-primary transition-all duration-200 outline-none"
                  />
                </div>

                {/* Time Display */}
                <span className="text-xs font-medium text-white/90">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-4 relative">
                {/* Playback Speed Quick Label */}
                <span className="text-[10px] bg-white/10 hover:bg-white/20 text-white/80 font-bold px-1.5 py-0.5 rounded pointer-events-none select-none">
                  {playbackSpeed === 1 ? 'Normal' : `${playbackSpeed}x`}
                </span>

                {/* Settings Toggle Trigger */}
                <button
                  onClick={() => {
                    setShowSettings(!showSettings);
                    setSettingsTab('main');
                  }}
                  className="text-white hover:text-primary transition-colors focus:outline-none"
                  aria-label="Settings"
                >
                  <Settings className={cn("h-5 w-5 transition-transform duration-300", showSettings ? "rotate-45" : "rotate-0")} />
                </button>

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-primary transition-colors focus:outline-none"
                  aria-label="Toggle Fullscreen"
                >
                  {isFullscreen ? (
                    <Minimize className="h-5 w-5" />
                  ) : (
                    <Maximize className="h-5 w-5" />
                  )}
                </button>

                {/* Modern Settings Dropdown Menu Card */}
                {showSettings && (
                  <div className="absolute right-0 bottom-8 mb-2 w-48 bg-zinc-950/95 backdrop-blur-md text-white border border-white/10 rounded-xl p-2.5 shadow-2xl z-20 flex flex-col gap-1 text-xs">
                    
                    {/* Tab Page: MAIN */}
                    {settingsTab === 'main' && (
                      <>
                        <div className="font-bold text-white/50 px-2 py-1 uppercase tracking-wider text-[9px] border-b border-white/5 mb-1">
                          Playback Settings
                        </div>
                        {/* Quality Select row */}
                        {hasHlsLoaded && levels.length > 0 && (
                          <button
                            onClick={() => setSettingsTab('quality')}
                            className="flex justify-between items-center px-2 py-1.5 rounded-lg hover:bg-white/10 text-left transition-colors"
                          >
                            <span>Quality</span>
                            <span className="text-white/60">
                              {currentQuality === -1 ? 'Auto' : levels[currentQuality]?.name}
                            </span>
                          </button>
                        )}
                        {/* Playback speed select row */}
                        <button
                          onClick={() => setSettingsTab('speed')}
                          className="flex justify-between items-center px-2 py-1.5 rounded-lg hover:bg-white/10 text-left transition-colors"
                        >
                          <span>Speed</span>
                          <span className="text-white/60">
                            {playbackSpeed === 1 ? 'Normal' : `${playbackSpeed}x`}
                          </span>
                        </button>
                      </>
                    )}

                    {/* Tab Page: QUALITY */}
                    {settingsTab === 'quality' && (
                      <>
                        <button 
                          onClick={() => setSettingsTab('main')}
                          className="text-left px-2 py-1 text-[9px] uppercase font-bold text-primary hover:text-white mb-1 transition-colors border-b border-white/5"
                        >
                          &larr; Back
                        </button>
                        <button
                          onClick={() => selectQuality(-1)}
                          className={cn(
                            "w-full text-left px-2 py-1.5 rounded-lg transition-colors hover:bg-white/10 flex items-center justify-between",
                            currentQuality === -1 ? "text-primary font-bold bg-primary/10" : ""
                          )}
                        >
                          <span>Auto</span>
                        </button>
                        {levels.map((level) => (
                          <button
                            key={level.index}
                            onClick={() => selectQuality(level.index)}
                            className={cn(
                              "w-full text-left px-2 py-1.5 rounded-lg transition-colors hover:bg-white/10 flex items-center justify-between",
                              currentQuality === level.index ? "text-primary font-bold bg-primary/10" : ""
                            )}
                          >
                            <span>{level.name}</span>
                          </button>
                        ))}
                      </>
                    )}

                    {/* Tab Page: SPEED */}
                    {settingsTab === 'speed' && (
                      <>
                        <button 
                          onClick={() => setSettingsTab('main')}
                          className="text-left px-2 py-1 text-[9px] uppercase font-bold text-primary hover:text-white mb-1 transition-colors border-b border-white/5"
                        >
                          &larr; Back
                        </button>
                        {speeds.map((sp) => (
                          <button
                            key={sp}
                            onClick={() => selectPlaybackSpeed(sp)}
                            className={cn(
                              "w-full text-left px-2 py-1.5 rounded-lg transition-colors hover:bg-white/10 flex items-center justify-between",
                              playbackSpeed === sp ? "text-primary font-bold bg-primary/10" : ""
                            )}
                          >
                            <span>{sp === 1 ? 'Normal (1x)' : `${sp}x`}</span>
                          </button>
                        ))}
                      </>
                    )}

                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
