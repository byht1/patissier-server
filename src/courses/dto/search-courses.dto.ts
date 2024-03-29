import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, Matches } from 'class-validator';
import { ECourseType } from 'src/db-schemas/course.schema';

export class SearchCoursesDto {
  @ApiProperty({
    example: 'courses',
    description: "'type' може мати тільки одне із двох значень: 'courses' або 'master_classes'",
    required: false,
  })
  @IsEnum(ECourseType, { message: "This query 'type' does not exist" })
  @Matches(/^\s*\S/, { message: 'type should not be empty' })
  @IsOptional()
  readonly type?: ECourseType;

  @ApiProperty({
    example: '3',
    description: 'Максимальна кількість курсів, які повертаються за один запит (3 за замовчуванням)', // rename
    required: false,
  })
  @IsNumberString({}, { message: 'limit must be a number' })
  @IsOptional()
  readonly limit?: number;

  @ApiProperty({
    example: '0',
    description: 'Кількість пропущених курсів за запитом', //
    required: false,
  })
  @IsNumberString({}, { message: 'skip must be a number' })
  @IsOptional()
  readonly skip?: number;
}
