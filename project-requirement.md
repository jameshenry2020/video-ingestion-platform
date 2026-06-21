# Media Upload Service RFC

## Project Context

Implement a production-grade large video upload and processing system inside an existing monorepo.

Stack:

Backend:

* NestJS
* Prisma
* PostgreSQL
* Redis
* BullMQ
* AWS SDK v3 (Cloudflare R2 compatible)

Frontend:

* Next.js App Router
* React
* TanStack Query
* Zustand
* Socket.IO Client

Media:

* FFmpeg
* FFprobe

Storage:

* Cloudflare R2

Goals:

* Support uploads up to 5GB
* Direct browser-to-R2 uploads
* Multipart uploads
* Resumable uploads
* Upload progress
* Processing progress
* Thumbnail generation
* Metadata extraction
* HLS generation
* WebSocket updates
* Horizontal scalability

---

# Architecture

Browser never uploads files through NestJS.

Required upload path:

Browser
→ Cloudflare R2

NestJS only orchestrates upload lifecycle.

Heavy processing must happen inside BullMQ workers.

No FFmpeg execution inside HTTP requests.

---

# Monorepo Structure

apps/
  api/
    src/
      modules/
        auth/
        uploads/
        videos/
        media-processing/

        storage/

        websocket/

      database/

      queues/

      workers/

      common/

       constants/

    web/
      src/
        components/
          upload/

          video/

          hooks/

          services/

        stores/

        lib/

        packages/

        shared/

        types/

        contracts/

        events/

---

# Backend Modules

uploads

Purpose:

* Upload session creation
* Multipart orchestration
* Presigned URL generation
* Upload completion

videos

Purpose:

* Video CRUD
* Video metadata retrieval
* Video listing
* Video status retrieval

storage

Purpose:

* R2 abstraction layer

media-processing

Purpose:

* Queue orchestration

websocket

Purpose:

* Real-time progress updates

---

# Database Models

## Video

Represents a single uploaded video.

Fields:

id

ownerId

title

description

status

processingProgress

uploadProgress

mimeType

fileSize

duration

width

height

fps

bitrate

codec

thumbnailUrl

playbackUrl

masterPlaylistKey

originalObjectKey

createdAt

updatedAt

---

## UploadSession

Tracks multipart upload.

Fields:

id

videoId

uploadId

objectKey

status

totalParts

uploadedParts

createdAt

expiresAt

---

## VideoProcessingJob

Tracks processing pipeline.

Fields:

id

videoId

jobType

status

progress

error

startedAt

completedAt

---

# Video Status Enum

INITIATED

UPLOADING

UPLOADED

PROCESSING

EXTRACTING_METADATA

GENERATING_THUMBNAIL

GENERATING_HLS

READY

FAILED

---

# Upload Lifecycle

1.

User selects file.

Frontend validates:

size

mime type

extension

2.

Frontend calls:

POST /uploads/initiate

3.

Backend:

Create Video

Create UploadSession

Create Multipart Upload in R2

Persist uploadId

Return session

4.

Frontend splits file into chunks.

Chunk size:

10MB

5.

Frontend uploads chunks directly to R2.

6.

Frontend calls complete endpoint.

7.

Backend finalizes multipart upload.

8.

Backend enqueues processing job.

---

# Upload Endpoints

## POST /uploads/initiate

Request

{
fileName
fileSize
mimeType
}

Response

{
videoId
uploadId
objectKey
chunkSize
}

Responsibilities:

Validate file

Create Video

Create UploadSession

Create Multipart Upload

---

## POST /uploads/presigned-part

Request

{
videoId
uploadId
partNumber
}

Response

{
signedUrl
}

Responsibilities:

Validate ownership

Validate upload session

Generate UploadPart URL

---

## POST /uploads/complete

Request

{
videoId
uploadId
parts:[]
}

Responsibilities:

Complete multipart upload

Update video status

Enqueue processing

---

## POST /uploads/abort

Request

{
videoId
}

Responsibilities:

Abort multipart upload

Delete session

Cleanup database

---

# Frontend Upload Architecture

components/upload/

UploadModal

UploadDropzone

UploadProgress

ProcessingProgress

UploadError

hooks/

useMultipartUpload

useUploadProgress

useVideoProcessing

stores/

upload.store.ts

---

# Upload Store

Tracks:

selectedFile

videoId

uploadId

status

uploadProgress

processingProgress

thumbnailUrl

playbackUrl

error

---

# useMultipartUpload Hook

Responsibilities:

Create upload session

Chunk file

Request signed URLs

Upload chunks

Store ETags

Resume uploads

Complete upload

Emit progress updates

---

# Chunk Upload Algorithm

chunkSize = 10MB

Calculate:

totalParts

Loop:

for each chunk

Request signed URL

Upload chunk

Store ETag

Update progress

After completion:

call complete endpoint

---

# Parallel Upload Strategy

Maximum concurrent uploads:

5

Example:

part1

part2

part3

part4

part5

in parallel

After completion:

next batch

This prevents browser overload.

---

# Upload Progress Formula

uploadedBytes

/

fileSize

*

100

Frontend calculates locally.

No backend dependency.

---

# Queue Design

Queue:

video-processing

Job Name:

process-video

Payload:

{
videoId
}

---

# Worker Pipeline

Single orchestration worker.

Steps:

extractMetadata()

generateThumbnail()

generateHls()

markReady()

---

# Metadata Service

Download original file.

Execute:

ffprobe

Extract:

duration

width

height

codec

bitrate

fps

Persist metadata.

Update progress:

10%

---

# Thumbnail Service

Generate frame.

Timestamp:

5 seconds

Output:

thumbnail.jpg

Upload to:

thumbnails/{videoId}/thumbnail.jpg

Save URL.

Update progress:

30%

---

# HLS Service

Input:

original.mp4

Generate:

360p

720p

1080p

Output:

master.m3u8

360/index.m3u8

720/index.m3u8

1080/index.m3u8

segment files

Upload all artifacts to R2.

Update progress:

90%

---

# HLS Folder Structure

hls/

{videoId}/

master.m3u8

360/

index.m3u8

segment0.ts

segment1.ts

720/

index.m3u8

segment0.ts

segment1.ts

1080/

index.m3u8

segment0.ts

segment1.ts

---

# Playback

Frontend never loads original MP4.

Frontend loads:

master.m3u8

through hls.js.

Player automatically selects bitrate.

---

# WebSocket Events

Namespace:

video-processing

Room:

video:{videoId}

---

# Event Payload

{
videoId
status
progress
thumbnailUrl
playbackUrl
}

---

# Processing Progress Mapping

Metadata

10%

Thumbnail

30%

HLS Start

50%

HLS Mid

75%

Upload Artifacts

90%

Ready

100%

---

# Frontend Processing Screen

After upload completion:

Show:

Thumbnail if available

Current processing stage

Processing progress

Disable playback

When READY:

Display player

Load playbackUrl

---

# Storage Keys

Original:

videos/raw/{videoId}/original.mp4

Thumbnail:

videos/thumbnails/{videoId}/thumbnail.jpg

HLS:

videos/hls/{videoId}/master.m3u8

---

# Security Requirements

All endpoints require authentication.

Validate ownership on every upload operation.

Use signed URLs.

Signed URL expiry:

5 minutes

Maximum upload size:

20GB

Allowed mime types:

video/mp4

video/webm

video/quicktime

Validate extension and mime type.

Generate UUID object keys.

Never trust client file names.

---

# Failure Handling

Chunk upload failure:

retry 3 times

Multipart completion failure:

retry endpoint

Worker failure:

BullMQ retries

attempts: 5

backoff:

exponential

Failed processing:

status = FAILED

Store error message.

Emit websocket update.

---

# Scalability Requirements

API servers must remain stateless.

Workers must scale independently.

Redis stores queues only.

Postgres stores metadata only.

R2 stores media only.

No video binary data inside Postgres.

No FFmpeg execution inside API process.

System must support:

20GB uploads

multiple concurrent uploads

horizontal worker scaling

resumable uploads

adaptive streaming playback
