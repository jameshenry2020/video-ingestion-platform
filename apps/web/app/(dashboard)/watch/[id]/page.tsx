"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { Progress } from "@/components/ui/progress";
import { io, Socket } from "socket.io-client";
import {
  ArrowLeft,
  Clock,
  Monitor,
  Tag,
  Film,
  Calendar,
  ShieldAlert,
  Loader2,
  HardDrive,
} from "lucide-react";
import Link from "next/link";

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
  fileSize: string; // Stored as string to handle BigInt conversions
  createdAt: string;
}

export default function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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

    if (video && video.status !== "READY" && video.status !== "FAILED") {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      socket = io(`${apiBaseUrl}/video-processing`, {
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        console.log("Watch page joined room:", videoId);
        socket?.emit("join-video", { videoId });
      });

      socket.on("video.processing.updated", (data: any) => {
        console.log("Watch page received progress:", data);
        setVideo((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            status: data.status || prev.status,
            processingProgress:
              data.progress !== undefined ? data.progress : prev.processingProgress,
            playbackUrl: data.playbackUrl || prev.playbackUrl,
            thumbnailUrl: data.thumbnailUrl || prev.thumbnailUrl,
          };
        });
      });

      socket.on("disconnect", () => {
        console.log("Watch page socket disconnected");
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
          "Could not load video. Please verify the ID or authentication session."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number | null) => {
    if (seconds === null || isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatBitrate = (bits: number | null) => {
    if (!bits) return "N/A";
    return (bits / 1000000).toFixed(2) + " Mbps";
  };

  const formatBytes = (bytesStr: string | null) => {
    if (!bytesStr) return "N/A";
    const bytes = parseFloat(bytesStr);
    if (isNaN(bytes) || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getStatusMessage = () => {
    if (!video) return "";
    switch (video.status) {
      case "INITIATING":
        return "Initiating upload session...";
      case "UPLOADING":
        return "Uploading video chunks to storage...";
      case "UPLOADED":
        return "Waiting to start processing...";
      case "PROCESSING":
        return "Worker initializing transcode environment...";
      case "EXTRACTING_METADATA":
        return "Extracting codec and resolution structures (10%)";
      case "GENERATING_THUMBNAIL":
        return "Extracting thumbnail frame capture (30%)";
      case "GENERATING_HLS":
        return `Transcoding HLS adaptive streams (${video.processingProgress}%)`;
      default:
        return "Transcoding...";
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">Loading video details...</span>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/20 text-destructive mx-auto">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground">Error Loading Video</h2>
          <p className="text-sm text-muted-foreground">{error || "Video not found"}</p>
        </div>
        <Link href="/" className="inline-block">
          <button className="inline-flex items-center gap-2 border border-border px-4 py-2 rounded-lg bg-secondary hover:bg-secondary-hover text-sm font-semibold transition">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-semibold transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Columns: Player or Transcoding banner */}
        <div className="lg:col-span-2 space-y-6">
          {video.status === "READY" && video.playbackUrl ? (
            <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
              <VideoPlayer
                src={video.playbackUrl}
                poster={video.thumbnailUrl || undefined}
              />
            </div>
          ) : video.status === "FAILED" ? (
            <div className="aspect-video w-full rounded-2xl border border-destructive bg-destructive/5 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <ShieldAlert className="h-12 w-12 text-destructive animate-pulse" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground">
                  Transcoding Failed
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  FFmpeg failed to transcode this video. Ensure it is a valid,
                  uncorrupted MP4/MOV source file.
                </p>
              </div>
            </div>
          ) : (
            <div className="aspect-video w-full rounded-2xl border border-border bg-card/25 flex flex-col items-center justify-center p-8 text-center space-y-6">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground">
                  Transcoding in Progress
                </h3>
                <p className="text-sm text-muted-foreground">{getStatusMessage()}</p>
              </div>
              <div className="w-full max-w-xs space-y-2">
                <Progress value={video.processingProgress} />
                <span className="text-xs font-bold text-muted-foreground">
                  {video.processingProgress}% Completed
                </span>
              </div>
            </div>
          )}

          {/* Details below player */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {video.title || video.originalFileName}
            </h1>
            <div className="glass-effect p-5 rounded-xl border border-border bg-card/10">
              <h4 className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-2">
                Description
              </h4>
              <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                {video.description || "No description provided for this video catalog entry."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Properties Card */}
        <div className="glass-effect rounded-2xl p-6 border border-border space-y-6 shadow-md">
          <h3 className="text-base font-bold text-foreground border-b border-border/80 pb-4">
            Video Properties
          </h3>

          <div className="space-y-5">
            {/* Duration */}
            <div className="flex gap-3 items-center">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                <Clock className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                  Duration
                </p>
                <p className="text-sm font-semibold mt-0.5 text-foreground">
                  {formatDuration(video.duration)}
                </p>
              </div>
            </div>

            {/* Resolution */}
            <div className="flex gap-3 items-center">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                <Monitor className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                  Dimensions
                </p>
                <p className="text-sm font-semibold mt-0.5 text-foreground">
                  {video.width && video.height
                    ? `${video.width} × ${video.height}`
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Codec */}
            <div className="flex gap-3 items-center">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                <Tag className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                  Codec & Frame Rate
                </p>
                <p className="text-sm font-semibold mt-0.5 text-foreground">
                  {video.codec ? video.codec.toUpperCase() : "N/A"}{" "}
                  {video.fps ? `@ ${video.fps} fps` : ""}
                </p>
              </div>
            </div>

            {/* Bitrate */}
            <div className="flex gap-3 items-center">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                <Film className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                  Bitrate
                </p>
                <p className="text-sm font-semibold mt-0.5 text-foreground">
                  {formatBitrate(video.bitrate)}
                </p>
              </div>
            </div>

            {/* File Size */}
            <div className="flex gap-3 items-center">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                <HardDrive className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                  File Size
                </p>
                <p className="text-sm font-semibold mt-0.5 text-foreground">
                  {formatBytes(video.fileSize)}
                </p>
              </div>
            </div>

            {/* Uploaded At */}
            <div className="flex gap-3 items-center">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                <Calendar className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                  Uploaded
                </p>
                <p className="text-sm font-semibold mt-0.5 text-foreground">
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
