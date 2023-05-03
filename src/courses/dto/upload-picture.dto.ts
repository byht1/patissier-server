import { IsFile, IsFileSize } from 'src/classValidator';

export class UploadPictureDto {
  @IsFile()
  @IsFileSize()
  readonly images: Express.Multer.File[];
}
