-- CreateEnum
CREATE TYPE "VideoStatus" AS ENUM ('INITIATED', 'UPLOADING', 'UPLOADED', 'PROCESSING', 'EXTRACTING_METADATA', 'GENERATING_THUMBNAIL', 'GENERATING_HLS', 'READY', 'FAILED');

-- CreateEnum
CREATE TYPE "UploadSessionStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'ABORTED', 'EXPIRED');

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "status" "VideoStatus" NOT NULL DEFAULT 'INITIATED',
    "uploadProgress" INTEGER NOT NULL DEFAULT 0,
    "processingProgress" INTEGER NOT NULL DEFAULT 0,
    "originalFileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSize" BIGINT NOT NULL,
    "duration" DOUBLE PRECISION,
    "width" INTEGER,
    "height" INTEGER,
    "fps" DOUBLE PRECISION,
    "bitrate" INTEGER,
    "codec" TEXT,
    "thumbnailUrl" TEXT,
    "playbackUrl" TEXT,
    "originalObjectKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadSession" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "uploadId" TEXT NOT NULL,
    "objectKey" TEXT NOT NULL,
    "status" "UploadSessionStatus" NOT NULL DEFAULT 'ACTIVE',
    "totalParts" INTEGER NOT NULL,
    "uploadedParts" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UploadSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoProcessingJob" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "VideoProcessingJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Video_status_idx" ON "Video"("status");

-- CreateIndex
CREATE UNIQUE INDEX "UploadSession_videoId_key" ON "UploadSession"("videoId");

-- CreateIndex
CREATE INDEX "UploadSession_uploadId_idx" ON "UploadSession"("uploadId");

-- CreateIndex
CREATE UNIQUE INDEX "VideoProcessingJob_jobId_key" ON "VideoProcessingJob"("jobId");

-- CreateIndex
CREATE INDEX "VideoProcessingJob_videoId_idx" ON "VideoProcessingJob"("videoId");

-- AddForeignKey
ALTER TABLE "UploadSession" ADD CONSTRAINT "UploadSession_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoProcessingJob" ADD CONSTRAINT "VideoProcessingJob_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
