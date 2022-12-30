import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchCourseDto {
  @ApiProperty({
    example: 'true',
    description: 'String for search Course by online offline',
  })
  @IsString({ message: 'Should be text' })
  readonly online: string;
  @ApiProperty({
    example: 'all',
    description: 'String for search Course by category',
  })
  @IsString({ message: 'Should be text' })
  readonly category: string;
}
