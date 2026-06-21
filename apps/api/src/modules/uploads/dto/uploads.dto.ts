import { IsString, IsNotEmpty, IsNumber, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class InitiateUploadDto {
  @IsString()
  @IsNotEmpty({ message: 'File name is required' })
  fileName: string;

  @IsNumber()
  @Min(1, { message: 'File size must be greater than 0' })
  fileSize: number;

  @IsString()
  @IsNotEmpty({ message: 'Mime type is required' })
  mimeType: string;
}

export class GeneratePartUrlDto {
  @IsString()
  @IsNotEmpty()
  videoId: string;

  @IsString()
  @IsNotEmpty()
  uploadId: string;

  @IsNumber()
  @Min(1)
  partNumber: number;
}

export class UploadPartInfo {
  @IsString()
  @IsNotEmpty()
  ETag: string;

  @IsNumber()
  @Min(1)
  PartNumber: number;
}

export class CompleteUploadDto {
  @IsString()
  @IsNotEmpty()
  videoId: string;

  @IsString()
  @IsNotEmpty()
  uploadId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UploadPartInfo)
  parts: UploadPartInfo[];
}

export class AbortUploadDto {
  @IsString()
  @IsNotEmpty()
  videoId: string;
}
