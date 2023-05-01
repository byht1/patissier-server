import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, Matches } from 'class-validator';

enum ECourseSearchType {
  COURSES ='courses',
  MASTER_CLASS = 'master-classes',
}

export class SearchCoursesDto {
  @ApiProperty({
    example: 'courses',
    description: '\'type\' може мати тільки одне із двох значень: \'courses\' або \'master-classes\'',
    required: false,
  })
  @IsEnum(ECourseSearchType, { message: 'This query \'type\' does not exist' })
  @Matches(/^\s*\S/, { message: 'type should not be empty' })
  @IsOptional()
  readonly type?: ECourseSearchType;

  @ApiProperty({
    example: '3',
    description: 'Кількість курсів на один запит',
    required: false
  })
  @IsNumberString({}, { message: 'count must be a number' })
  @IsOptional()
  readonly count?: number;

  @ApiProperty({
    example: '0',
    description: 'Кількість пропущених курсів за запитом', //
    required: false
  })
  @IsNumberString({}, { message: 'skip must be a number' })
  @IsOptional()
  readonly skip?: number;
}
