import { PrismaClient, VideoStatus } from './generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  console.log('Database URL:', process.env.DATABASE_URL);
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({
    adapter,
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    console.log('Connecting...');
    await prisma.$connect();
    console.log('Querying videos via transaction...');
    const page = 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const [videos, total] = await prisma.$transaction([
      prisma.video.findMany({
        where: { status: VideoStatus.READY },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.video.count({
        where: { status: VideoStatus.READY },
      }),
    ]);

    console.log('Success!', { videos, total });
  } catch (err) {
    console.error('CRITICAL ERROR CAUGHT:');
    console.error(err);
    if (err instanceof Error) {
      console.error('Stack:', err.stack);
    }
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
