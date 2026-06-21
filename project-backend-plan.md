# NestJS Media Upload Service - Implementation Contract v1

## Objective

Implement a production-grade video upload and processing platform using:

* NestJS
* PostgreSQL
* Prisma
* BullMQ
* Redis
* Cloudflare R2
* FFmpeg
* FFprobe
* Socket.IO

The system must support:

* Direct browser → R2 multipart uploads
* Upload progress
* Processing progress
* Metadata extraction
* Thumbnail generation
* Multi-bitrate HLS generation
* Real-time updates
* Horizontal worker scaling

---

# Prisma Schema

## VideoStatus

```prisma
enum VideoStatus {
  INITIATED
  UPLOADING
  UPLOADED
  PROCESSING
  EXTRACTING_METADATA
  GENERATING_THUMBNAIL
  GENERATING_HLS
  READY
  FAILED
}
```

## UploadSessionStatus

```prisma
enum UploadSessionStatus {
  ACTIVE
  COMPLETED
  ABORTED
  EXPIRED
}
```

## Video

```prisma
model Video {
  id                  String @id @default(uuid())

  ownerId             String

  title               String?
  description         String?

  status              VideoStatus

  uploadProgress      Int @default(0)
  processingProgress  Int @default(0)

  originalFileName    String
  mimeType            String

  fileSize            BigInt

  duration            Float?

  width               Int?
  height              Int?

  fps                 Float?
  bitrate             Int?

  codec               String?

  thumbnailUrl        String?

  playbackUrl         String?

  originalObjectKey   String

  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  uploadSession       UploadSession?
}
```

## UploadSession

```prisma
model UploadSession {
  id             String @id @default(uuid())

  videoId        String @unique

  uploadId       String

  objectKey      String

  status         UploadSessionStatus

  totalParts     Int

  uploadedParts  Int @default(0)

  expiresAt      DateTime

  createdAt      DateTime @default(now())

  video Video @relation(
    fields:[videoId],
    references:[id]
  )
}
```

## ProcessingJob

```prisma
model ProcessingJob {
  id String @id @default(uuid())

  videoId String

  status String

  progress Int

  error String?

  createdAt DateTime @default(now())
}
```

---

# Folder Structure

```text
src/

modules/

 uploads/

  uploads.controller.ts
  uploads.service.ts
  uploads.repository.ts

 videos/

  videos.controller.ts
  videos.service.ts

 processing/

  processing.service.ts

 websocket/

  processing.gateway.ts

 storage/

  r2.service.ts

 queues/

  queue.constants.ts

 workers/

  video.processor.ts

 media/

  ffmpeg.service.ts
  ffprobe.service.ts

 prisma/

 common/

 dto/

 enums/
```

---

# Queue Constants

```typescript
export const VIDEO_QUEUE =
'video-processing'

export const VIDEO_PROCESS_JOB =
'process-video'
```

---

# DTOs

## InitiateUploadDto

```typescript
export class InitiateUploadDto {

 fileName:string

 fileSize:number

 mimeType:string
}
```

---

## GeneratePartUrlDto

```typescript
export class GeneratePartUrlDto {

 videoId:string

 uploadId:string

 partNumber:number
}
```

---

## CompleteUploadDto

```typescript
export class CompleteUploadDto {

 videoId:string

 uploadId:string

 parts:{
   ETag:string
   PartNumber:number
 }[]
}
```

---

## AbortUploadDto

```typescript
export class AbortUploadDto {

 videoId:string
}
```

---

# API Contract

## POST /uploads/initiate

Purpose:

Create video record.

Create multipart upload.

Create upload session.

### Request

```json
{
  "fileName":"movie.mp4",
  "fileSize":5320000000,
  "mimeType":"video/mp4"
}
```

### Response

```json
{
  "videoId":"uuid",
  "uploadId":"r2-upload-id",
  "objectKey":"videos/raw/{videoId}/original.mp4",
  "chunkSize":10485760
}
```

---

## POST /uploads/presigned-part

### Request

```json
{
  "videoId":"uuid",
  "uploadId":"xxx",
  "partNumber":1
}
```

### Response

```json
{
  "url":"signed-url"
}
```

---

## POST /uploads/complete

### Request

```json
{
  "videoId":"uuid",
  "uploadId":"xxx",
  "parts":[
    {
      "ETag":"etag",
      "PartNumber":1
    }
  ]
}
```

### Response

```json
{
  "success":true
}
```

Behavior:

* Complete multipart upload
* Mark UploadSession COMPLETE
* Set Video status UPLOADED
* Queue processing job

---

## POST /uploads/abort

### Request

```json
{
  "videoId":"uuid"
}
```

Behavior:

* AbortMultipartUpload
* Delete upload session

---

## GET /videos/:id

Response

```json
{
  "id":"uuid",
  "status":"GENERATING_HLS",
  "uploadProgress":100,
  "processingProgress":75,
  "thumbnailUrl":"...",
  "playbackUrl":null
}
```

---

# R2 Service Contract

## createMultipartUpload

```typescript
createMultipartUpload(
 objectKey:string
)
```

returns:

```typescript
{
 uploadId:string
}
```

---

## generatePartUploadUrl

```typescript
generatePartUploadUrl(
 objectKey:string,
 uploadId:string,
 partNumber:number
)
```

returns:

```typescript
string
```

---

## completeMultipartUpload

```typescript
completeMultipartUpload(
 uploadId:string,
 objectKey:string,
 parts:[]
)
```

---

## abortMultipartUpload

```typescript
abortMultipartUpload(
 uploadId:string,
 objectKey:string
)
```

---

## uploadFile

Used by workers.

```typescript
uploadFile(
 localPath:string,
 objectKey:string
)
```

---

## downloadFile

```typescript
downloadFile(
 objectKey:string,
 outputPath:string
)
```

---

# BullMQ Contract

Queue

```typescript
video-processing
```

Job

```typescript
process-video
```

Payload

```typescript
{
  videoId:string
}
```

Options

```typescript
{
 attempts:5,

 backoff:{
   type:'exponential',
   delay:5000
 }
}
```

---

# Processing Worker

```typescript
@Processor(VIDEO_QUEUE)
```

Receives:

```typescript
{
 videoId
}
```

Pipeline:

```typescript
extractMetadata()

generateThumbnail()

generateHls()

markReady()
```

---

# Processing Progress Mapping

```typescript
10
metadata

30
thumbnail

50
hls start

75
hls encoding

90
hls upload

100
ready
```

---

# Metadata Extraction

Worker downloads:

```text
videos/raw/{videoId}/original.mp4
```

Local:

```text
/tmp/{videoId}/original.mp4
```

---

Run:

```bash
ffprobe \
-v quiet \
-print_format json \
-show_format \
-show_streams \
input.mp4
```

Extract:

```typescript
duration

width

height

codec

fps

bitrate
```

Update Video.

---

# Thumbnail Generation

Command

```bash
ffmpeg \
-i input.mp4 \
-ss 00:00:05 \
-vframes 1 \
thumbnail.jpg
```

Output

```text
/tmp/{videoId}/thumbnail.jpg
```

Upload:

```text
videos/thumbnails/{videoId}/thumbnail.jpg
```

Update:

```typescript
thumbnailUrl
```

---

# HLS Generation

Input

```text
original.mp4
```

Output Folder

```text
/tmp/{videoId}/hls
```

Generate:

360p

720p

1080p

---

360p

```bash
ffmpeg \
-i input.mp4 \
-vf scale=-2:360 \
-c:v libx264 \
-preset medium \
-crf 23 \
-c:a aac \
-hls_time 6 \
-hls_playlist_type vod \
360/index.m3u8
```

---

720p

```bash
ffmpeg \
-i input.mp4 \
-vf scale=-2:720 \
-c:v libx264 \
-preset medium \
-crf 23 \
-c:a aac \
-hls_time 6 \
-hls_playlist_type vod \
720/index.m3u8
```

---

1080p

```bash
ffmpeg \
-i input.mp4 \
-vf scale=-2:1080 \
-c:v libx264 \
-preset medium \
-crf 23 \
-c:a aac \
-hls_time 6 \
-hls_playlist_type vod \
1080/index.m3u8
```

---

Master Playlist

Create:

```text
master.m3u8
```

Contents:

```text
#EXTM3U

#EXT-X-STREAM-INF:BANDWIDTH=800000
360/index.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=2500000
720/index.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=5000000
1080/index.m3u8
```

---

Upload To R2

```text
videos/hls/{videoId}/master.m3u8

videos/hls/{videoId}/360/*

videos/hls/{videoId}/720/*

videos/hls/{videoId}/1080/*
```

---

Playback URL

```text
/videos/hls/{videoId}/master.m3u8
```

Store:

```typescript
playbackUrl
```

---

# Socket.IO Contract

Namespace

```typescript
/video-processing
```

Room

```typescript
video:{videoId}
```

---

Client Subscribe

```typescript
socket.emit(
 'join-video',
 {
   videoId
 }
)
```

---

Server Event

```typescript
video.processing.updated
```

Payload

```typescript
{
 videoId:string

 status:string

 progress:number

 thumbnailUrl?:string

 playbackUrl?:string
}
```

Example

```json
{
 "videoId":"123",
 "status":"GENERATING_THUMBNAIL",
 "progress":30
}
```

---

Ready Event

```json
{
 "videoId":"123",
 "status":"READY",
 "progress":100,
 "thumbnailUrl":"...",
 "playbackUrl":"..."
}
```

---

# Cleanup Contract

After success:

Delete:

```text
/tmp/{videoId}
```

After failure:

Delete:

```text
/tmp/{videoId}
```

Always cleanup temporary files.

---

# Frontend Expectations

Upload UI must display:

Uploading

0-100%

Then automatically switch to:

Processing

0-100%

Then:

READY

Display:

Thumbnail

Duration

Resolution

HLS Player

Playback URL

No page refresh required.

```
```
