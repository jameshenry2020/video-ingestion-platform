"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Film, Monitor, Clock, PlayCircle, RotateCw, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface VideoCatalogItem {
  id: string;
  title: string | null;
  originalFileName: string;
  thumbnailUrl: string | null;
  duration: number | null;
  width: number | null;
  height: number | null;
  codec: string | null;
  status: string;
  createdAt: string;
}

export default function CatalogPage() {
  const [videos, setVideos] = useState<VideoCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await api.get("/videos");
      setVideos(res.data.videos || []);
    } catch (err) {
      console.error("Failed to fetch videos catalog:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const formatDuration = (seconds: number | null) => {
    if (seconds === null || isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getResolutionLabel = (width: number | null, height: number | null) => {
    if (!width || !height) return "SD";
    if (height >= 1080) return "1080p Full HD";
    if (height >= 720) return "720p HD";
    return `${width}x${height}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "READY":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Ready
          </span>
        );
      case "FAILED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Failed
          </span>
        );
      case "INITIATING":
      case "UPLOADING":
      case "UPLOADED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse">
            Uploading
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
            Processing
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Video Catalog
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse transcoded adaptive HLS videos hosted directly on Cloudflare R2.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={fetchVideos}
            disabled={loading}
            className="gap-2"
          >
            <RotateCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh Catalog
          </Button>
          <Link href="/upload">
            <Button className="gap-2">
              <Play className="h-4 w-4 fill-current" />
              Upload New
            </Button>
          </Link>
        </div>
      </div>

      {/* Videos List */}
      {loading ? (
        <div className="flex justify-center items-center py-32">
          <div className="flex flex-col items-center gap-3">
            <RotateCw className="h-8 w-8 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Loading videos...</span>
          </div>
        </div>
      ) : videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 px-4 rounded-2xl border-2 border-dashed border-border bg-card/20 max-w-xl mx-auto">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/40 text-muted-foreground mb-4">
            <Film className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">No videos available</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            Upload and transcode video files to populate the adaptive streaming gallery.
          </p>
          <Link href="/upload">
            <Button variant="gradient" size="lg">
              Upload Your First Video
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Link
              href={`/watch/${video.id}`}
              key={video.id}
              className="group flex flex-col glass-effect rounded-xl overflow-hidden shadow-md hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              {/* Thumbnail Wrapper */}
              <div className="relative aspect-video w-full bg-muted/50 overflow-hidden">
                {video.thumbnailUrl ? (
                  <img
                    src={video.thumbnailUrl}
                    alt={video.originalFileName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/60 text-muted-foreground">
                    <Film className="h-10 w-10 opacity-40 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                )}
                
                {/* Duration Indicator */}
                {video.duration && (
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-black/80 text-white select-none">
                    {formatDuration(video.duration)}
                  </span>
                )}

                {/* Play Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayCircle className="h-12 w-12 text-white drop-shadow-md scale-95 group-hover:scale-100 transition-transform duration-300" />
                </div>
              </div>

              {/* Meta details */}
              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold leading-snug line-clamp-1 group-hover:text-primary transition-colors text-foreground">
                    {video.title || video.originalFileName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Monitor className="h-3.5 w-3.5" />
                    <span>{getResolutionLabel(video.width, video.height)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                  </div>
                  {getStatusBadge(video.status)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
