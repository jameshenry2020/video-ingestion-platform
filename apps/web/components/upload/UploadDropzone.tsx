"use client";

import { useState, useRef } from "react";
import { useUploadStore } from "@/stores/upload.store";
import { UploadCloud } from "lucide-react";
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
    // Limit: 20GB
    const MAX_SIZE = 20 * 1024 * 1024 * 1024;
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
      className={`group flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-12 cursor-pointer transition-all duration-300 bg-card/10 select-none ${
        dragActive
          ? "border-primary bg-primary/5 scale-[0.99]"
          : "border-border hover:border-primary/40 hover:bg-card/25"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple={false}
        onChange={handleChange}
        accept="video/*"
        className="hidden"
      />
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/80 text-primary mb-5 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
        <UploadCloud className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-1">
        Drag and drop your video file here
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        or click to browse from files
      </p>
      
      <Button
        type="button"
        variant="secondary"
        className="pointer-events-none group-hover:bg-secondary-hover transition-colors"
      >
        Select File
      </Button>
      
      <span className="text-xs text-muted-foreground mt-6 uppercase tracking-wider font-semibold">
        Supports files up to 20GB (MP4, WEBM, MOV)
      </span>
    </div>
  );
}
