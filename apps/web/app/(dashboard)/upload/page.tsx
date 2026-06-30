"use client";

import { useEffect } from "react";
import { useUploadStore } from "@/stores/upload.store";
import { useMultipartUpload } from "@/hooks/useMultipartUpload";
import { UploadDropzone } from "@/components/upload/UploadDropzone";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { io, Socket } from "socket.io-client";
import { Loader2, CheckCircle2, AlertCircle, Play, Film, X } from "lucide-react";
import Link from "next/link";

export default function UploadPage() {
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

  // Listen to WebSocket events for real-time transcoding progress
  useEffect(() => {
    let socket: Socket | null = null;

    if (
      videoId &&
      (status === "UPLOADED" ||
        status === "PROCESSING" ||
        status.startsWith("GENERATING") ||
        status.startsWith("EXTRACTING"))
    ) {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      socket = io(`${apiBaseUrl}/video-processing`, {
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        console.log("WebSocket connected. Joining room for video:", videoId);
        socket?.emit("join-video", { videoId });
      });

      socket.on("video.processing.updated", (data: any) => {
        console.log("Received socket progress update:", data);
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

      socket.on("disconnect", () => {
        console.log("WebSocket disconnected");
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
      case "INITIATING":
        return "Initiating secure R2 upload session...";
      case "UPLOADING":
        return `Uploading video parts to Cloudflare R2 (${uploadProgress}%)`;
      case "UPLOADED":
        return "Upload complete! Starting transcoding jobs...";
      case "PROCESSING":
        return "Worker picked up video. Preparing pipeline...";
      case "EXTRACTING_METADATA":
        return "Extracting stream metadata & bitrates (10%)";
      case "GENERATING_THUMBNAIL":
        return "Generating video thumbnail poster (30%)";
      case "GENERATING_HLS":
        return `Generating adaptive multi-bitrate HLS streams (${processingProgress}%)`;
      case "READY":
        return "Video is ready for adaptive streaming (100%)";
      case "FAILED":
        return "Processing pipeline failed";
      default:
        return "Idle";
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Title */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Upload Video
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Publish video content to Cloudflare R2 for multi-bitrate adaptive HLS viewing.
        </p>
      </div>

      <div className="glass-effect rounded-2xl p-8 border border-border shadow-xl">
        {/* IDLE state */}
        {status === "IDLE" && (
          <div className="space-y-6">
            {!selectedFile ? (
              <UploadDropzone />
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between bg-secondary/30 border border-border p-5 rounded-xl">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
                      <Film className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-foreground truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatBytes(selectedFile.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => reset()}
                    className="text-muted-foreground hover:text-foreground shrink-0 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-end gap-3">
                  <Button variant="outline" onClick={() => reset()}>
                    Cancel
                  </Button>
                  <Button variant="gradient" size="lg" onClick={uploadFile}>
                    Start Upload
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ACTIVE UPLOAD / PROCESSING state */}
        {(status === "INITIATING" ||
          status === "UPLOADING" ||
          status === "UPLOADED" ||
          status.startsWith("GENERATING") ||
          status.startsWith("EXTRACTING") ||
          status === "PROCESSING") && (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-6">
            <div className="relative flex items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <Film className="absolute h-5 w-5 text-primary/70 animate-pulse" />
            </div>

            <div className="space-y-2 w-full">
              <h3 className="font-bold text-lg text-foreground">
                {getStatusLabel()}
              </h3>
              {selectedFile && (
                <p className="text-xs text-muted-foreground max-w-md mx-auto truncate">
                  {selectedFile.name} ({formatBytes(selectedFile.size)})
                </p>
              )}
            </div>

            {/* Progress indicators */}
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                <span>
                  {status === "UPLOADING" ? "Uploading to R2" : "Processing (FFmpeg)"}
                </span>
                <span>
                  {status === "UPLOADING" ? `${uploadProgress}%` : `${processingProgress}%`}
                </span>
              </div>
              <Progress
                value={status === "UPLOADING" ? uploadProgress : processingProgress}
              />
            </div>

            {status === "UPLOADING" && (
              <Button variant="destructive" onClick={cancelUpload} className="px-6">
                Cancel Upload
              </Button>
            )}
          </div>
        )}

        {/* SUCCESS/READY state */}
        {status === "READY" && (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground">
                Upload & Transcode Successful!
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Your video has been partitioned into HLS playlists and is ready for playback.
              </p>
            </div>

            {thumbnailUrl && (
              <div className="relative w-full max-w-md aspect-video rounded-xl border border-border overflow-hidden bg-muted">
                <img
                  src={thumbnailUrl}
                  alt="Video Thumbnail Poster"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={reset}>
                Upload Another
              </Button>
              {videoId && (
                <Link href={`/watch/${videoId}`}>
                  <Button variant="gradient" className="gap-2">
                    <Play className="h-4 w-4 fill-current" />
                    Watch Video
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* FAILURE state */}
        {status === "FAILED" && (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
              <AlertCircle className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground">
                Upload or Processing Failed
              </h3>
              <p className="text-sm text-rose-400 font-semibold max-w-md mx-auto">
                {error || "An error occurred during video transcoding. Please check the logs."}
              </p>
            </div>

            <Button variant="gradient" onClick={reset} className="px-8">
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
