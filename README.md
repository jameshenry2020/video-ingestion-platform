# Distributed Media Upload & Adaptive Processing Service

A production-grade, horizontally scalable video platform designed to handle large media files (up to 20GB) with browser-to-storage direct uploads, session recovery, worker transcodings, and real-time progress streams.

---

## Architecture Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Browser as Browser / Next.js Client
    participant API as NestJS API Gateway
    participant DB as PostgreSQL (Prisma)
    participant Queue as Redis (BullMQ)
    participant Worker as FFmpeg Worker Node
    participant R2 as Cloudflare R2 Bucket

    %% Upload Flow
    Browser->>API: POST /uploads/initiate (file metadata)
    API->>R2: Create Multipart Upload
    R2-->>API: Return S3 UploadId
    API->>DB: Create Video & UploadSession (INITIATED)
    API-->>Browser: Return videoId, uploadId, objectKey & chunkSize (10MB)

    rect rgb(30, 41, 59)
        note right of Browser: Parallel chunk uploading loop
        Browser->>API: POST /uploads/presigned-part (part number)
        API-->>Browser: Return R2 Presigned Upload URL (5 min expiry)
        Browser->>R2: PUT chunk binary directly to R2
        R2-->>Browser: Return ETag header
        Browser->>API: POST /uploads/part-complete (notify progress)
        API->>DB: Increment session uploadedParts
        API->>Browser: Emit live uploadProgress via WebSockets
    end

    Browser->>API: POST /uploads/complete (all ETags & PartNumbers)
    API->>R2: Complete Multipart Upload
    API->>DB: Update UploadSession (COMPLETED) & Video (UPLOADED)
    API->>Queue: Enqueue 'process-video' job
    API-->>Browser: Return success status

    %% Processing Flow
    Queue->>Worker: Consume processing job (videoId)
    Worker->>DB: Update Video status (PROCESSING, 0%)
    Worker->>R2: Download raw original.mp4 to local workspace
    
    Worker->>Worker: Run ffprobe (extract duration, codec, width/height)
    Worker->>DB: Save metadata, update status (EXTRACTING_METADATA, 10%)
    
    Worker->>Worker: Run ffmpeg (capture thumbnail poster at offset)
    Worker->>R2: Upload thumbnail.jpg
    Worker->>DB: Save thumbnailUrl, update status (GENERATING_THUMBNAIL, 30%)
    
    Worker->>Worker: Run ffmpeg (transcode adaptive HLS streams: 360p, 720p, 1080p)
    note right of Worker: Progress interpolated dynamically (50% to 90%)
    Worker->>R2: Upload HLS directory (.m3u8 manifests & .ts segments)
    
    Worker->>DB: Save playbackUrl, update status (READY, 100%)
    Worker->>Worker: Recurse clean local workspace directories
    Worker->>Browser: Broadcast status READY & links via WebSocket room
```

---

## Core Architectural Rules

1.  **Direct-to-Storage Uploads:** Video binaries never pass through the NestJS API. Browser uploads chunk binary streams (10MB slices) directly to Cloudflare R2 using presigned URLs.
2.  **Out-of-Process Transcoding:** Controllers never run FFmpeg or FFprobe. CPU-intensive operations are pushed to BullMQ queues and consumed by isolated, independently scaleable worker nodes.
3.  **Stateless API Tier:** The database (PostgreSQL) stores metadata only; R2 serves media transcode segment files. No persistent binaries are stored on local API hosts.
4.  **Resumable Upload Loop:** Interrupted uploads query the backend R2 `ListParts` API wrapper to determine already-uploaded slices and resume upload loops from the exact offset.
5.  **Dynamic Adaptive Quality Scale:** The transcoder checks the source video height via `ffprobe`. It only downscales to resolutions equal to or lower than the input (e.g. upscaling 720p to 1080p is skipped).

---

## Tech Stack

### Backend API & Workers
*   **Framework:** NestJS
*   **Database ORM:** Prisma
*   **Relational Engine:** PostgreSQL
*   **Cache & Message Broker:** Redis
*   **Task Queue:** BullMQ
*   **Storage API:** AWS SDK v3 (Cloudflare R2 compatible)
*   **Environment Config:** `@itgorillaz/configify` (Decorator-based schema loading)
*   **Media Wrappers:** `fluent-ffmpeg` (Requires host binaries of FFmpeg & FFprobe)
*   **Real-time updates:** Socket.IO Gateway

### Frontend Web
*   **Framework:** Next.js (App Router, React 19)
*   **State Management:** Zustand
*   **Network Client:** Axios & Socket.IO Client
*   **HLS Player:** `hls.js`

---

## Project Structure

```text
├── apps/
│   ├── api/                      # NestJS API Gateway & BullMQ worker
│   │   ├── prisma/               # Database schemas & migrations files
│   │   ├── src/
│   │   │   ├── config/           # Type-safe Configify environment classes
│   │   │   ├── modules/
│   │   │   │   ├── auth/         # JWT registrations, logins, guards
│   │   │   │   ├── uploads/      # S3/R2 presigning, resumability checks
│   │   │   │   ├── videos/       # Catalog pagination & details metadata
│   │   │   │   ├── websocket/    # Live processing gateway
│   │   │   │   ├── storage/      # R2 AWS SDK operations client
│   │   │   │   ├── media/        # FFmpeg & FFprobe engines
│   │   │   │   └── workers/      # BullMQ video processing consumers
│   │   │   └── main.ts           # Bootstrapper
│   └── web/                      # Next.js Web Portal
│       ├── app/                  # Route layouts, pages (home, watch)
│       ├── components/           # UploadDropzones, Players, Auth panels
│       ├── hooks/                # Resumable multipart loop hooks
│       └── stores/               # Zustand upload stores
├── packages/
│   ├── typescript-config/        # Shared compiler flags config
│   ├── eslint-config/            # Shared linter configurations
│   └── ui/                       # UI React stub package
```

---

## Setup & Execution

### Prerequisites
*   Node.js (>= 18)
*   pnpm (>= 9.0.0)
*   Docker & Docker Compose
*   FFmpeg & FFprobe binaries installed on host PATH

### 1. Boot up PostgreSQL & Redis Containers
At the root of the monorepo, run:
```bash
docker compose up -d
```
This spins up PostgreSQL on port `5433` and Redis on port `6379`.

### 2. Configure Environment Variables
Create a `.env` file under `apps/api/.env` matching this configuration:
```env
DATABASE_URL="postgresql://postgres:james@4321@localhost:5433/upload_service_db?schema=public"

PORT=3001
JWT_SECRET=production-secret-token-change-me
JWT_EXPIRY=1d

REDIS_HOST=localhost
REDIS_PORT=6379

R2_ENDPOINT=https://<your-cloudflare-account-id>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=<your-r2-access-key-id>
R2_SECRET_ACCESS_KEY=<your-r2-secret-access-key>
R2_BUCKET_NAME=<your-r2-bucket-name>
R2_PUBLIC_URL=https://<your-bucket-public-subdomain-url>.r2.dev
```

### 3. Run Database Migrations
Prisma v7 uses the `prisma.config.ts` loader to read connection URLs:
```bash
cd apps/api
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Run Development Servers
From the monorepo root directory, start the apps:
```bash
pnpm dev
```
*   **NestJS API:** [http://localhost:3001](http://localhost:3001)
*   **Next.js Client:** [http://localhost:3000](http://localhost:3000)

---

## Verification & Testing Instructions

1.  Open the web portal at `http://localhost:3000`.
2.  Register and Log in using the **AuthPanel** form.
3.  Drag your video file (up to 20GB) into the **UploadDropzone** box.
4.  Verify direct browser-to-R2 upload: open the browser's Network inspector and monitor `PUT` calls going directly to R2 bucket addresses, completely skipping API servers.
5.  **Validate Upload Resumability:** Halfway through the upload, refresh the browser page or disrupt your network. Drag the same video file again. Inspect the console logs; the client checks completed chunks on R2 and resumes uploading the remaining parts seamlessly.
6.  Once uploaded, monitor real-time transcode updates via WebSockets room broadcasts:
    *   `10%` — FFprobe runs metadata probe.
    *   `30%` — FFmpeg extracts thumbnail.
    *   `50% - 90%` — FFmpeg outputs multi-bitrate HLS streams (progress ticks in real time).
    *   `100%` — Variants are uploaded, temporary filesystem paths are cleared, and playback URL is active.
7.  Click **Watch Video** to play the adaptive bitrate HLS manifest in the player.
