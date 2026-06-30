"use client";

import { useEffect, useState } from "react";
import { useUploadStore } from "@/stores/upload.store";
import { useMultipartUpload } from "@/hooks/useMultipartUpload";
import { UploadDropzone } from "@/components/upload/UploadDropzone";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { io, Socket } from "socket.io-client";
import { 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  Film, 
  X, 
  Copy, 
  Check, 
  Sparkles,
  Server,
  Info,
  Circle
} from "lucide-react";
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
  const [copied, setCopied] = useState(false);

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

  const copyToClipboard = () => {
    if (!playbackUrl) return;
    navigator.clipboard.writeText(playbackUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStepStatus = (stepId: string) => {
    if (status === "FAILED") {
      if (stepId === "upload" && uploadProgress < 100) return "failed";
      if (stepId === "transcode") return "failed";
      return "success";
    }

    if (status === "READY") return "success";

    switch (stepId) {
      case "upload":
        if (status === "INITIATING" || status === "UPLOADING") return "loading";
        return "success";
      case "metadata":
        if (status === "INITIATING" || status === "UPLOADING") return "pending";
        if (status === "UPLOADED" || status === "PROCESSING" || status === "EXTRACTING_METADATA") return "loading";
        return "success";
      case "thumbnail":
        if (
          status === "INITIATING" ||
          status === "UPLOADING" ||
          status === "UPLOADED" ||
          status === "PROCESSING" ||
          status === "EXTRACTING_METADATA"
        ) {
          return "pending";
        }
        if (status === "GENERATING_THUMBNAIL") return "loading";
        return "success";
      case "transcode":
        if (status === "GENERATING_HLS") return "loading";
        return "pending";
      default:
        return "pending";
    }
  };

  const renderStepIcon = (stepStatus: "pending" | "loading" | "success" | "failed") => {
    switch (stepStatus) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-emerald-400 fill-emerald-500/10 shrink-0" />;
      case "failed":
        return <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />;
      case "loading":
        return <Loader2 className="h-5 w-5 text-indigo-400 animate-spin shrink-0" />;
      default:
        return <Circle className="h-5 w-5 text-slate-700 shrink-0" />;
    }
  };

  const steps = [
    {
      id: "upload",
      name: "Cloud Storage Upload",
      description: "Segmenting raw video and uploading chunks directly to Cloudflare R2",
      showProgress: status === "UPLOADING" || status === "INITIATING",
      progressValue: uploadProgress,
    },
    {
      id: "metadata",
      name: "Metadata & Stream Analysis",
      description: "Running FFprobe to extract stream tracks, codecs, frame rates, and bitrates",
    },
    {
      id: "thumbnail",
      name: "Thumbnail Capture Extraction",
      description: "Extracting reference poster-frame poster capture from active stream frames",
    },
    {
      id: "transcode",
      name: "Adaptive HLS Transcoding",
      description: "Transcoding segments into multi-bitrate streams (360p, 480p, 720p, 1080p)",
      showProgress: status === "GENERATING_HLS",
      progressValue: processingProgress,
    },
  ];

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 relative">
      {/* Title */}
      <div className="border-b border-white/[0.04] pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Server className="h-3 w-3" /> Worker Node Upload
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mt-2">
          Upload Video
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Publish video content to Cloudflare R2 and convert it into adaptive, multi-bitrate HLS streams.
        </p>
      </div>

      <div className="glass-effect rounded-3xl p-8 border border-white/[0.04] shadow-xl relative overflow-hidden">
        {/* Glow behind container */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl pointer-events-none" />

        {/* IDLE state */}
        {status === "IDLE" && (
          <div className="space-y-6">
            {!selectedFile ? (
              <UploadDropzone />
            ) : (
              <div className="flex flex-col gap-6">
                {/* File Details Display Card */}
                <div className="flex items-center justify-between bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                      <Film className="h-5.5 w-5.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-slate-200 truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {formatBytes(selectedFile.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => reset()}
                    className="text-slate-400 hover:text-white hover:bg-white/[0.05] shrink-0 rounded-full"
                  >
                    <X className="h-4.5 w-4.5" />
                  </Button>
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-end gap-3 border-t border-white/[0.04] pt-5">
                  <Button 
                    variant="outline" 
                    onClick={() => reset()}
                    className="border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] text-slate-300 rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={uploadFile}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-md border-none px-6 font-semibold"
                  >
                    Start Upload
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ACTIVE UPLOAD / PROCESSING / TRANSCODING state */}
        {(status === "INITIATING" ||
          status === "UPLOADING" ||
          status === "UPLOADED" ||
          status.startsWith("GENERATING") ||
          status.startsWith("EXTRACTING") ||
          status === "PROCESSING") && (
          <div className="space-y-8 py-4">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 animate-pulse">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-base text-white">Transcoding Pipeline Active</h3>
                <p className="text-xs text-slate-400 mt-0.5 truncate max-w-md">
                  Processing: {selectedFile?.name || "Video File"} ({selectedFile ? formatBytes(selectedFile.size) : ""})
                </p>
              </div>
              {status === "UPLOADING" && (
                <Button 
                  variant="destructive" 
                  onClick={cancelUpload} 
                  className="rounded-xl px-4 py-1 text-xs h-8 border-none bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-all font-semibold"
                >
                  Cancel Upload
                </Button>
              )}
            </div>

            {/* Stepper Pipeline Visualizer */}
            <div className="space-y-6 border-l border-white/[0.06] ml-5 pl-7 relative">
              {steps.map((step) => {
                const stepStatus = getStepStatus(step.id);
                return (
                  <div key={step.id} className="relative group">
                    {/* Icon position */}
                    <div className="absolute -left-[39px] top-0 bg-[#030408] rounded-full p-1 border border-[#030408]">
                      {renderStepIcon(stepStatus)}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold transition-colors ${
                          stepStatus === "pending" ? "text-slate-600" : 
                          stepStatus === "loading" ? "text-indigo-400" : "text-slate-300"
                        }`}>
                          {step.name}
                        </span>
                        {step.showProgress && (
                          <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded">
                            {step.progressValue}%
                          </span>
                        )}
                      </div>
                      <p className={`text-xs transition-colors ${
                        stepStatus === "pending" ? "text-slate-700" : "text-slate-400"
                      }`}>
                        {step.description}
                      </p>

                      {/* Micro Progress Bar inside active step */}
                      {step.showProgress && (
                        <div className="w-full pt-1.5">
                          <Progress value={step.progressValue} className="h-1.5" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SUCCESS/READY state */}
        {status === "READY" && (
          <div className="flex flex-col items-center justify-center py-6 text-center space-y-6">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
              <CheckCircle2 className="h-7 w-7" />
              <div className="absolute inset-0 rounded-2xl border border-emerald-500/30 scale-110 animate-ping opacity-20" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Transcoding Successful!
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                Your video has been partitioned into HLS playlists and is now ready for adaptive streaming.
              </p>
            </div>

            {thumbnailUrl && (
              <div className="relative w-full max-w-md aspect-video rounded-2xl border border-white/[0.06] overflow-hidden bg-slate-950 shadow-inner group">
                <img
                  src={thumbnailUrl}
                  alt="Transcoded Video Thumbnail Poster"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="text-[10px] text-white/90 bg-black/50 px-2 py-0.5 rounded border border-white/10 font-mono">
                    Adaptive Manifest Ready
                  </span>
                </div>
              </div>
            )}

            {/* Playback URL Copy Bar */}
            {playbackUrl && (
              <div className="w-full max-w-md flex items-center bg-[#07090e] border border-white/[0.05] rounded-xl overflow-hidden pl-3 pr-1.5 py-1.5">
                <span className="text-[11px] text-slate-500 truncate font-mono text-left flex-1 mr-2 select-all">
                  {playbackUrl}
                </span>
                <Button
                  onClick={copyToClipboard}
                  variant="ghost"
                  className="h-8 rounded-lg px-3 gap-1.5 text-xs text-indigo-400 hover:text-white hover:bg-indigo-500/10 shrink-0 transition-all font-semibold"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy Manifest
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center gap-3 border-t border-white/[0.04] pt-6 w-full max-w-md justify-center">
              <Button 
                variant="outline" 
                onClick={reset}
                className="border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] text-slate-300 rounded-xl"
              >
                Upload Another
              </Button>
              {videoId && (
                <Link href={`/watch/${videoId}`}>
                  <Button className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-md border-none px-6 font-semibold">
                    <Play className="h-4.5 w-4.5 fill-current" />
                    Watch Video
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* FAILURE state */}
        {status === "FAILED" && (
          <div className="flex flex-col items-center justify-center py-6 text-center space-y-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-lg">
              <AlertCircle className="h-7 w-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Upload or Transcode Failed
              </h3>
              <p className="text-sm text-rose-400/90 font-medium max-w-md mx-auto">
                {error || "An error occurred during transcoding processing. Please verify file integrity."}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={reset}
                className="border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] text-slate-300 rounded-xl"
              >
                Reset Upload
              </Button>
              <Button 
                onClick={reset}
                className="bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-xl border border-rose-500/20 transition-all font-semibold"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Helper Info Card */}
      <div className="glass-effect rounded-2xl p-4 border border-white/[0.04] flex items-start gap-3 bg-white/[0.01]">
        <Info className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-400 leading-relaxed">
          <p className="font-bold text-slate-300">How adaptiveness works:</p>
          <p className="mt-0.5">
            Once uploaded, the worker transcribes your video into multiple resolution tiers (1080p, 720p, etc.) and segments it into small 4-second `.ts` chunks. Playback uses an HLS `.m3u8` manifest file to adjust bitrates on-the-fly according to the client's network speed.
          </p>
        </div>
      </div>
    </div>
  );
}
