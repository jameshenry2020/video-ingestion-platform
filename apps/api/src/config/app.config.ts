import { Configuration, RequiredArgsConstructor, Value } from '@itgorillaz/configify';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

@Configuration()
export class AppConfiguration {


  @Value('PORT', { parse: (val) => parseInt(val, 10), default: 3001 })
  @IsNumber()
  @Min(1)
  port: number;

  @Value('REDIS_HOST', { default: 'localhost' })
  @IsString()
  @IsNotEmpty()
  redisHost: string;

  @Value('REDIS_PORT', { parse: (val) => parseInt(val, 10), default: 6379 })
  @IsNumber()
  @Min(1)
  redisPort: number;

  @Value('R2_ENDPOINT')
  @IsString()
  @IsNotEmpty()
  r2Endpoint: string;

  @Value('R2_ACCESS_KEY_ID')
  @IsString()
  @IsNotEmpty()
  r2AccessKeyId: string;

  @Value('R2_SECRET_ACCESS_KEY')
  @IsString()
  @IsNotEmpty()
  r2SecretAccessKey: string;

  @Value('R2_BUCKET_NAME', { parse: (val) => val || 'production-media-upload-bucket', default: 'production-media-upload-bucket' })
  @IsString()
  @IsNotEmpty()
  r2BucketName: string;

  @Value('R2_PUBLIC_URL')
  @IsString()
  @IsNotEmpty()
  r2PublicUrl: string

}

@Configuration()
@RequiredArgsConstructor()
export class DatabaseConfiguration {
  @Value('DATABASE_URL')
  @IsString()
  @IsNotEmpty()
  databaseUrl: string;


  constructor(config: Required<DatabaseConfiguration>) {
    this.databaseUrl = config.databaseUrl;
  }
}
