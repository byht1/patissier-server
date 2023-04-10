import { IsFile, IsFileSize } from 'src/classValidator';

export class UploadPictureDto {
  @IsFile()
  @IsFileSize()
  readonly picture: Express.Multer.File[];
}
