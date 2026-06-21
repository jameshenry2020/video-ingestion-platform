# Production Media Upload Service Specification

## Goal

Build a production-grade large video upload service using:

* Next.js (Frontend)
* NestJS (Backend API)
* PostgreSQL
* Prisma
* Redis
* BullMQ
* Cloudflare R2
* FFmpeg / FFprobe

The system must support:

* Multi-GB uploads
* Multipart uploads
* Upload progress
* Resumable uploads
* Background processing
* Metadata extraction
* Thumbnail generation
* HLS generation
* Real-time processing updates
* Horizontal scalability

---

# Architecture

Frontend never uploads files through NestJS.

Required flow:

Browser → R2 Direct Multipart Upload

NestJS only:

* Creates upload session
* Generates presigned URLs
* Completes multipart uploads
* Stores metadata
* Queues processing jobs

---

# Storage Structure

videos/

raw/

{videoId}/original.mp4

thumbnails/

{videoId}/thumbnail.jpg

hls/

{videoId}/360/

index.m3u8

segment*.ts

hls/

{videoId}/720/

index.m3u8

segment*.ts

hls/

{videoId}/1080/

index.m3u8

segment*.ts

---

# Video Lifecycle

INITIATED

↓

UPLOADING

↓

UPLOADED

↓

PROCESSING

↓

EXTRACTING_METADATA

↓

GENERATING_THUMBNAIL

↓

GENERATING_HLS

↓

READY

OR

FAILED

---

# Upload Flow

## Step 1

User selects file.

Frontend validates:

* File size
* Mime type
* Extension

---

## Step 2

Frontend calls:

POST /uploads/initiate

Request:

{
fileName,
fileSize,
mimeType
}

Backend:

* Creates Video record
* Creates Multipart Upload in R2
* Stores uploadId
* Returns upload session

Response:

{
videoId,
uploadId,
objectKey
}

---

## Step 3

Frontend splits file.

Chunk size:

10MB

Example:

5GB file

→ 500 chunks

---

## Step 4

For every chunk:

Frontend calls:

POST /uploads/presigned-part

Request:

{
videoId,
uploadId,
partNumber
}

Backend generates UploadPart signed URL.

Response:

{
url
}

---

## Step 5

Frontend uploads chunk directly to R2.

Browser → R2

Store returned ETag.

Repeat for every chunk.

---

## Step 6

After all chunks uploaded:

POST /uploads/complete

Request:

{
videoId,
uploadId,
parts:[
{
PartNumber,
ETag
}
]
}

Backend:

* Calls CompleteMultipartUpload
* Updates status to UPLOADED
* Enqueues processing job

---

# Processing Pipeline

BullMQ Queue:

video-processing

---

Worker receives:

{
videoId
}

---

## Metadata Stage

Download original file.

Run:

ffprobe

Extract:

* Duration
* Width
* Height
* Codec
* Bitrate

Save to database.

Update:

status = EXTRACTING_METADATA

progress = 10

---

## Thumbnail Stage

Generate thumbnail.

Example:

5 seconds into video.

Upload thumbnail to R2.

Save thumbnail URL.

Update:

status = GENERATING_THUMBNAIL

progress = 30

---

## HLS Stage

Generate:

360p

720p

1080p

Output:

index.m3u8

segment*.ts

Upload all files to R2.

Update:

status = GENERATING_HLS

progress = 90

---

## Complete Stage

Save:

playbackUrl

thumbnailUrl

duration

resolution

status = READY

progress = 100

---

# Real-Time Updates

Use WebSockets.

Frontend subscribes:

video:{videoId}

Worker emits:

{
status,
progress
}

Examples:

{
status:"GENERATING_THUMBNAIL",
progress:30
}

{
status:"GENERATING_HLS",
progress:85
}

{
status:"READY",
progress:100
}

---

# Frontend Upload UI

States:

Idle

↓

Selecting File

↓

Uploading

(show upload percentage)

↓

Processing

(show processing percentage)

↓

Ready

(show thumbnail + video player)

---

# Frontend Video Page

Display:

thumbnail

title

duration

resolution

processing state

playbackUrl

Use hls.js player.

Load:

index.m3u8

not original mp4.

---

# Scalability Rules

Never upload through NestJS.

Never process videos inside API requests.

All FFmpeg work must happen inside BullMQ workers.

Workers must scale independently from API servers.

All uploaded files must be stored in R2.

Database stores metadata only.

Redis stores queues only.

Use signed URLs for all upload operations.

Use UUIDs for all object keys.

Use lifecycle cleanup for temporary processing files.

System must support files larger than 5GB.


Critical Architectural Rules

Rule #1

Never upload large video files through NestJS.

Forbidden:

Browser
→ NestJS
→ R2

Required:

Browser
→ R2

NestJS only orchestrates upload lifecycle.

Rule #2

Never process videos inside HTTP requests.

Forbidden:

Controller
→ FFmpeg

Required:

Controller
→ Queue Job

Worker
→ FFmpeg

Rule #3

Never store media binaries in PostgreSQL.

Postgres stores metadata only.

All media must be stored in Cloudflare R2.

Rule #4

Workers must be independently scalable.

API servers and processing workers are separate concerns.

Design for horizontal scaling.

Rule #5

All upload operations must be resumable.

Assume network failures.

Assume browser crashes.

Assume interrupted uploads.

Design for recovery.

Rule #6

Every state transition must be persisted.

Never rely solely on in-memory state.

Persist upload state.

Persist processing state.

Persist failure state.

Persist retry state.
