import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    example: 'Торти',
    description: 'Category',
  })
  @IsString({ message: 'Should be text' })
  readonly category: string;

  @ApiProperty({
    example:
      'Дівчата, ці тістечка просто бомба-ракета!!! Нарешті дійшов мій марципан, і я одразу приготувала, тому тепер я в графіку і в ногу з іншими учасниками курсу.',
    description: 'comments',
  })
  @IsString({ message: 'Should be text' })
  readonly comments: string;
}
