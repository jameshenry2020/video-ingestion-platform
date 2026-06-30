"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { 
  Film, 
  Monitor, 
  Clock, 
  RotateCw, 
  Play, 
  Search, 
  SlidersHorizontal, 
  Plus, 
  Database, 
  Cpu, 
  Tv, 
  Sparkles,
  ArrowUpDown,
  ListVideo
} from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [resolutionFilter, setResolutionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

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
    if (height >= 1080) return "1080p FHD";
    if (height >= 720) return "720p HD";
    return `${height}p`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "READY":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Ready
          </span>
        );
      case "FAILED":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Failed
          </span>
        );
      case "INITIATING":
      case "UPLOADING":
      case "UPLOADED":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 animate-pulse">
            Uploading
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 animate-pulse">
            Processing
          </span>
        );
    }
  };

  // Dashboard Stats Calculations
  const stats = {
    totalVideos: videos.length,
    readyVideos: videos.filter((v) => v.status === "READY").length,
    hdVideos: videos.filter((v) => (v.height || 0) >= 720).length,
    totalDuration: videos.reduce((acc, curr) => acc + (curr.duration || 0), 0),
  };

  // Client Side Filtering and Sorting
  const filteredVideos = videos.filter((video) => {
    const titleMatch = (video.title || video.originalFileName)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    if (resolutionFilter === "all") return titleMatch;
    
    const height = video.height || 0;
    if (resolutionFilter === "1080p") return titleMatch && height >= 1080;
    if (resolutionFilter === "720p") return titleMatch && height >= 720 && height < 1080;
    if (resolutionFilter === "sd") return titleMatch && (height === 0 || height < 720);
    
    return titleMatch;
  });

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortBy === "duration-desc") {
      return (b.duration || 0) - (a.duration || 0);
    }
    if (sortBy === "duration-asc") {
      return (a.duration || 0) - (b.duration || 0);
    }
    return 0;
  });

  return (
    <div className="space-y-8 relative">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-white/[0.04] pb-8">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="h-3 w-3" /> Transcoding System
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
            Media Library
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
            Monitor and distribute multi-bitrate HLS streams transcoded from raw uploads via Cloudflare R2 storage.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            onClick={fetchVideos}
            disabled={loading}
            className="gap-2 border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] text-slate-300 hover:text-white transition-all rounded-xl h-10 px-4"
          >
            <RotateCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Link href="/upload">
            <Button className="gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 text-white border-none transition-all shadow-md shadow-indigo-500/10 rounded-xl h-10 px-5 font-semibold">
              <Plus className="h-4.5 w-4.5" />
              Upload Video
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Assets */}
        <div className="glass-effect rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Assets</span>
            <p className="text-2xl font-black text-white">{loading ? "—" : stats.totalVideos}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <ListVideo className="h-5 w-5" />
          </div>
        </div>

        {/* Ready Assets */}
        <div className="glass-effect rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Streaming Ready</span>
            <p className="text-2xl font-black text-white">{loading ? "—" : stats.readyVideos}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Tv className="h-5 w-5" />
          </div>
        </div>

        {/* High Resolution */}
        <div className="glass-effect rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">HD / 1080p</span>
            <p className="text-2xl font-black text-white">{loading ? "—" : stats.hdVideos}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Monitor className="h-5 w-5" />
          </div>
        </div>

        {/* Playback Time */}
        <div className="glass-effect rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Runtime</span>
            <p className="text-2xl font-black text-white">
              {loading ? "—" : formatDuration(stats.totalDuration)}
            </p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
            <Clock className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Filters Hub Card */}
      <div className="glass-effect rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/[0.04]">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search catalog by title or filename..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0a0b12] border border-white/[0.06] hover:border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Resolution Filter */}
          <div className="flex items-center gap-2 bg-[#0a0b12] border border-white/[0.06] rounded-xl px-3 py-1.5">
            <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-400" />
            <select
              value={resolutionFilter}
              onChange={(e) => setResolutionFilter(e.target.value)}
              className="bg-transparent border-none text-xs font-semibold text-slate-300 outline-none cursor-pointer pr-1"
            >
              <option value="all">All Resolutions</option>
              <option value="1080p">1080p FHD</option>
              <option value="720p">720p HD</option>
              <option value="sd">Standard Def</option>
            </select>
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-2 bg-[#0a0b12] border border-white/[0.06] rounded-xl px-3 py-1.5">
            <ArrowUpDown className="h-3.5 w-3.5 text-purple-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-xs font-semibold text-slate-300 outline-none cursor-pointer pr-1"
            >
              <option value="newest">Newest Uploads</option>
              <option value="oldest">Oldest Uploads</option>
              <option value="duration-desc">Runtime: Longest</option>
              <option value="duration-asc">Runtime: Shortest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Videos Catalog Grid */}
      {loading ? (
        /* Dynamic shimmer skeleton screen */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="glass-effect rounded-2xl overflow-hidden flex flex-col h-[280px] border border-white/[0.04]">
              <div className="aspect-video w-full bg-slate-900/30 animate-shimmer" />
              <div className="p-5 flex-1 flex flex-col justify-between gap-4 bg-white/[0.01]">
                <div className="space-y-2.5">
                  <div className="h-4 w-3/4 bg-slate-800 rounded-md animate-pulse" />
                  <div className="h-3 w-1/2 bg-slate-800 rounded-md animate-pulse" />
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-white/[0.03]">
                  <div className="h-3 w-1/3 bg-slate-800 rounded-md animate-pulse" />
                  <div className="h-5 w-14 bg-slate-800 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : sortedVideos.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-3xl border border-dashed border-white/[0.08] bg-white/[0.01] max-w-xl mx-auto shadow-inner relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-48 h-48 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03] text-indigo-400 mb-6 border border-white/[0.04] shadow-inner">
            <Film className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No videos match search</h3>
          <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
            There are no matching assets. Either clear your filter queries or upload a new raw video.
          </p>
          <div className="flex items-center gap-3">
            {(searchQuery !== "" || resolutionFilter !== "all") && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setResolutionFilter("all");
                }}
                className="border-white/[0.06] rounded-xl hover:bg-white/[0.04] text-slate-300"
              >
                Clear Filters
              </Button>
            )}
            <Link href="/upload">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-md border-none px-6">
                Upload First Video
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* Catalog Items Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedVideos.map((video) => (
            <Link
              href={`/watch/${video.id}`}
              key={video.id}
              className="group flex flex-col glass-effect rounded-2xl overflow-hidden shadow-lg border border-white/[0.04] hover:border-indigo-500/30 hover:shadow-[0_0_50px_rgba(99,102,241,0.1)] hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full bg-black/50 overflow-hidden border-b border-white/[0.02]">
                {video.thumbnailUrl ? (
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title || video.originalFileName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#090b11] text-slate-600">
                    <Film className="h-10 w-10 opacity-30 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                )}
                
                {/* Duration Badge */}
                {video.duration && (
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md text-[9px] font-black bg-black/80 backdrop-blur-sm text-slate-200 select-none">
                    {formatDuration(video.duration)}
                  </span>
                )}

                {/* Cover Play Icon Trigger */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/25 shadow-xl scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Play className="h-4.5 w-4.5 text-white fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Meta Descriptions */}
              <div className="p-4.5 flex-1 flex flex-col justify-between gap-4 bg-white/[0.01]">
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold leading-snug line-clamp-1 group-hover:text-indigo-400 transition-colors text-slate-200">
                    {video.title || video.originalFileName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                    <Monitor className="h-3.5 w-3.5 text-indigo-400/80" />
                    <span>{getResolutionLabel(video.width, video.height)}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-700" />
                    <span className="uppercase text-[9px] px-1 bg-white/[0.04] rounded border border-white/[0.04]">{video.codec || "H264"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.04] pt-3 text-[10px] font-semibold text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-purple-400/70" />
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
