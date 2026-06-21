import { Configuration, Value } from '@itgorillaz/configify';

@Configuration()
export class AppConfig {
  @Value('DATABASE_URL')
  databaseUrl: string;

  @Value('PORT', { parse: (val) => parseInt(val, 10), default: 3001 })
  port: number;

  @Value('JWT_SECRET', { default: 'super-secret-jwt-key-change-in-production' })
  jwtSecret: string;

  @Value('JWT_EXPIRY', { default: '1d' })
  jwtExpiry: string;

  @Value('REDIS_HOST', { default: 'localhost' })
  redisHost: string;

  @Value('REDIS_PORT', { parse: (val) => parseInt(val, 10), default: 6379 })
  redisPort: number;

  @Value('R2_ENDPOINT')
  r2Endpoint: string;

  @Value('R2_ACCESS_KEY_ID')
  r2AccessKeyId: string;

  @Value('R2_SECRET_ACCESS_KEY')
  r2SecretAccessKey: string;

  @Value('R2_BUCKET_NAME', { default: 'production-media-upload-bucket' })
  r2BucketName: string;

  @Value('R2_PUBLIC_URL', { default: 'http://localhost:3001' })
  r2PublicUrl: string;
}
