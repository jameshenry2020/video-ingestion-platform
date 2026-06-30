"use client";

import { useState, useRef } from "react";
import { useUploadStore } from "@/stores/upload.store";
import { UploadCloud, Film, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UploadDropzone() {
  const { setFile, setError } = useUploadStore();
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
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
    const MAX_SIZE = 20 * 1024 * 1024 * 1024; // 20GB
    if (file.size > MAX_SIZE) {
      setError("File is too large. Maximum allowed size is 20GB.");
      return;
    }

    if (!file.type.startsWith("video/")) {
      setError("Invalid file type. Please upload a valid video file.");
      return;
    }

    setFile(file);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={onButtonClick}
      className={`group relative flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-14 cursor-pointer transition-all duration-300 select-none overflow-hidden ${
        dragActive
          ? "border-indigo-500 bg-indigo-500/5 shadow-[0_0_50px_rgba(99,102,241,0.1)] scale-[0.99]"
          : "border-white/[0.08] bg-[#07090e]/30 hover:border-indigo-500/30 hover:bg-[#07090e]/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.03)]"
      }`}
    >
      {/* Decorative Glow Spots */}
      <div className="absolute -right-20 -top-20 w-48 h-48 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors duration-500" />
      <div className="absolute -left-20 -bottom-20 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-500" />

      <input
        ref={fileInputRef}
        type="file"
        multiple={false}
        onChange={handleChange}
        accept="video/*"
        className="hidden"
      />

      {/* Upload Icon Circle Container */}
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.02] text-indigo-400 mb-6 border border-white/[0.04] shadow-inner transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-purple-500 group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_4px_20px_rgba(99,102,241,0.25)]">
        <div className="absolute inset-0 rounded-2xl border border-indigo-500/30 scale-100 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping" />
        <UploadCloud className="h-8 w-8 group-hover:animate-bounce" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
        Drag and drop your video file here
      </h3>
      <p className="text-xs sm:text-sm text-slate-400 mb-8 text-center max-w-xs leading-relaxed">
        or click to browse local files on your machine
      </p>
      
      <Button
        type="button"
        className="pointer-events-none bg-white/[0.03] text-slate-200 font-semibold px-8 py-5 rounded-xl border border-white/[0.06] group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-md"
      >
        Select Video File
      </Button>
      
      <div className="flex items-center gap-2 mt-8 text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">
        <Film className="h-3.5 w-3.5 text-indigo-500/80" />
        <span>Supports MP4, WEBM, MOV (Max 20GB)</span>
      </div>
    </div>
  );
}
