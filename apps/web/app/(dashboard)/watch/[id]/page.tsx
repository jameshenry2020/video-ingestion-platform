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
  Cpu,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  Circle,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
  fileSize: string;
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
  const [copied, setCopied] = useState(false);

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

  const copyPlaybackUrl = () => {
    if (!video?.playbackUrl) return;
    navigator.clipboard.writeText(video.playbackUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        return "Initiating secure storage session...";
      case "UPLOADING":
        return "Uploading chunks directly to Cloudflare R2...";
      case "UPLOADED":
        return "File stored on R2, waiting for worker connection...";
      case "PROCESSING":
        return "Worker initializing transcode container...";
      case "EXTRACTING_METADATA":
        return "Analyzing codec and stream format metadata...";
      case "GENERATING_THUMBNAIL":
        return "Extracting poster capture frame...";
      case "GENERATING_HLS":
        return `Segmenting and transcoding multi-bitrate HLS streams (${video.processingProgress}%)`;
      default:
        return "Transcoding adaptive formats...";
    }
  };

  const getStepStatus = (stepId: string) => {
    if (!video) return "pending";
    if (video.status === "FAILED") {
      if (stepId === "transcode") return "failed";
      return "success";
    }
    if (video.status === "READY") return "success";

    switch (stepId) {
      case "upload":
        return "success"; // Stored in R2 if we are here
      case "metadata":
        if (
          video.status === "INITIATING" ||
          video.status === "UPLOADING" ||
          video.status === "UPLOADED" ||
          video.status === "PROCESSING" ||
          video.status === "EXTRACTING_METADATA"
        ) {
          return "loading";
        }
        return "success";
      case "thumbnail":
        if (
          video.status === "INITIATING" ||
          video.status === "UPLOADING" ||
          video.status === "UPLOADED" ||
          video.status === "PROCESSING" ||
          video.status === "EXTRACTING_METADATA"
        ) {
          return "pending";
        }
        if (video.status === "GENERATING_THUMBNAIL") return "loading";
        return "success";
      case "transcode":
        if (video.status === "GENERATING_HLS") return "loading";
        return "pending";
      default:
        return "pending";
    }
  };

  const renderStepIcon = (stepStatus: "pending" | "loading" | "success" | "failed") => {
    switch (stepStatus) {
      case "success":
        return <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 fill-emerald-500/10 shrink-0" />;
      case "failed":
        return <AlertCircle className="h-4.5 w-4.5 text-rose-400 shrink-0" />;
      case "loading":
        return <Loader2 className="h-4.5 w-4.5 text-indigo-400 animate-spin shrink-0" />;
      default:
        return <Circle className="h-4.5 w-4.5 text-slate-700 shrink-0" />;
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
          <span className="text-sm text-slate-400 font-semibold">Resolving video details...</span>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-450 mx-auto border border-rose-500/20 shadow-lg">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">Error loading asset</h2>
          <p className="text-sm text-slate-450">{error || "Asset not found"}</p>
        </div>
        <Link href="/" className="inline-block">
          <Button variant="outline" className="gap-2 border-white/[0.08] hover:bg-white/[0.04] text-slate-300">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  const steps = [
    { id: "upload", name: "R2 Chunk Upload" },
    { id: "metadata", name: "Codec Stream Inspection" },
    { id: "thumbnail", name: "Poster Extraction" },
    { id: "transcode", name: "HLS Multi-bitrate Transcoding" }
  ];

  return (
    <div className="space-y-6 relative">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white font-semibold transition group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Columns: Player or Transcoding console */}
        <div className="lg:col-span-2 space-y-6">
          {video.status === "READY" && video.playbackUrl ? (
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.04] bg-black shadow-2xl group">
              {/* Backlight Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl opacity-60 pointer-events-none -z-10" />
              <VideoPlayer
                src={video.playbackUrl}
                poster={video.thumbnailUrl || undefined}
                className="w-full h-full"
              />
            </div>
          ) : video.status === "FAILED" ? (
            <div className="aspect-video w-full rounded-2xl border border-rose-500/20 bg-rose-500/5 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-rose-500/15 text-rose-450 border border-rose-500/25 flex items-center justify-center animate-pulse">
                <ShieldAlert className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Transcoding Process Failed</h3>
                <p className="text-xs text-slate-450 max-w-sm mx-auto leading-relaxed">
                  FFmpeg encoding failed. Ensure the raw asset uploaded is a valid, uncorrupted MP4/MOV source file.
                </p>
              </div>
            </div>
          ) : (
            /* Transcoding Screen Display */
            <div className="aspect-video w-full rounded-2xl border border-white/[0.04] bg-[#07090e]/40 flex flex-col items-center justify-center p-8 text-center space-y-6 glass-effect shadow-xl">
              <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold animate-pulse">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Processing Pipeline Active
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white">Transcoder processing formats</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  {getStatusMessage()}
                </p>
              </div>
              <div className="w-full max-w-xs space-y-2">
                <Progress value={video.processingProgress} className="h-1.5" />
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-450">
                  <span>Segmentation Transcoding</span>
                  <span>{video.processingProgress}% Complete</span>
                </div>
              </div>

              {/* Stepper overview on watch page */}
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/[0.04] pt-5 w-full max-w-md">
                {steps.map((step, idx) => {
                  const stepStatus = getStepStatus(step.id);
                  return (
                    <div key={step.id} className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
                      {renderStepIcon(stepStatus)}
                      <span className={stepStatus === "loading" ? "text-indigo-400 font-bold" : ""}>
                        {step.name}
                      </span>
                      {idx < steps.length - 1 && <ChevronRight className="h-3 w-3 text-slate-700 ml-1.5 hidden sm:inline" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Details below player */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {video.title || video.originalFileName}
            </h1>
            <div className="glass-effect p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
              <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-indigo-400 mb-2.5">
                Description
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {video.description || "No description provided for this video catalog entry."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Properties Card */}
        <div className="space-y-6">
          <div className="glass-effect rounded-2xl p-6 border border-white/[0.04] space-y-6 shadow-xl relative overflow-hidden">
            <h3 className="text-sm font-bold text-white border-b border-white/[0.04] pb-4 flex items-center gap-2">
              <Cpu className="h-4.5 w-4.5 text-indigo-400" />
              Video Inspector
            </h3>

            <div className="space-y-4.5">
              {/* Duration */}
              <div className="flex gap-3 items-center">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.04] text-slate-400 shadow-inner">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-wider text-slate-500">Duration</p>
                  <p className="text-xs font-semibold mt-0.5 text-slate-200">{formatDuration(video.duration)}</p>
                </div>
              </div>

              {/* Resolution */}
              <div className="flex gap-3 items-center">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.04] text-slate-400 shadow-inner">
                  <Monitor className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-wider text-slate-500">Dimensions</p>
                  <p className="text-xs font-semibold mt-0.5 text-slate-200">
                    {video.width && video.height ? `${video.width} × ${video.height}` : "N/A"}
                  </p>
                </div>
              </div>

              {/* Codec */}
              <div className="flex gap-3 items-center">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.04] text-slate-400 shadow-inner">
                  <Tag className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-wider text-slate-500">Codec & Frames</p>
                  <p className="text-xs font-semibold mt-0.5 text-slate-200">
                    {video.codec ? video.codec.toUpperCase() : "N/A"}{" "}
                    {video.fps ? `@ ${video.fps} fps` : ""}
                  </p>
                </div>
              </div>

              {/* Bitrate */}
              <div className="flex gap-3 items-center">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.04] text-slate-400 shadow-inner">
                  <Film className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-wider text-slate-500">Avg Bitrate</p>
                  <p className="text-xs font-semibold mt-0.5 text-slate-200">{formatBitrate(video.bitrate)}</p>
                </div>
              </div>

              {/* File Size */}
              <div className="flex gap-3 items-center">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.04] text-slate-400 shadow-inner">
                  <HardDrive className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-wider text-slate-500">File Size</p>
                  <p className="text-xs font-semibold mt-0.5 text-slate-200">{formatBytes(video.fileSize)}</p>
                </div>
              </div>

              {/* Uploaded At */}
              <div className="flex gap-3 items-center">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.04] text-slate-400 shadow-inner">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-wider text-slate-500">Uploaded</p>
                  <p className="text-xs font-semibold mt-0.5 text-slate-200">
                    {new Date(video.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Share / Copy Stream URL Card */}
          {video.status === "READY" && video.playbackUrl && (
            <div className="glass-effect rounded-2xl p-5 border border-white/[0.04] space-y-4 shadow-xl">
              <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-indigo-400">
                Share Manifest URL
              </h4>
              <p className="text-xs text-slate-450 leading-relaxed">
                Adaptive HTTP Live Streaming (HLS) playlist link ready for third-party embedding.
              </p>
              
              <div className="flex items-center bg-[#07090e] border border-white/[0.05] rounded-xl p-1.5 pl-3">
                <span className="text-[10px] text-slate-500 font-mono truncate flex-1 mr-2 select-all">
                  {video.playbackUrl}
                </span>
                <Button
                  onClick={copyPlaybackUrl}
                  variant="ghost"
                  className="h-8 rounded-lg px-3 gap-1.5 text-[11px] text-indigo-400 hover:text-white hover:bg-indigo-500/10 transition-all font-semibold shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy URL
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
