import { IsFile, IsFileSize } from 'src/classValidator';

export class CreatePictureDto {
  @IsFile()
  @IsFileSize()
  readonly picture: Express.Multer.File[];
}
