import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { DatabaseConfiguration } from '../config/app.config';
import { PrismaClient } from '../../generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor(private dbConfig: DatabaseConfiguration) {
    const connectionString = dbConfig.databaseUrl;

    if (!connectionString) {
      throw new Error(
        'DATABASE_URL is not configured. Ensure it is set in .env or AppConfig.',
      );
    }

    const adapter = new PrismaPg({ connectionString });

    super({
      adapter,
      log: ['error', 'warn'],
    });

    this.logger.log(
      `PrismaService initialized (source: ${dbConfig.databaseUrl ? 'AppConfig' : 'process.env'})`,
    );
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connection established');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
