import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
// import { EType } from 'src/db-schemas/courses.schema';

export class SearchCoursesDto {
  @ApiProperty({
    example: 'Курс',
    description: '\'type\' може мати тільки одне із двох значень: \'курс\' або \'майстер-клас\'',
    required: false,
  })
  @IsString({ message: 'Should be text' })
  readonly type?: '';

  @ApiProperty({ description: 'Кількість курсів на один запит', example: '3', required: false })
  readonly count?: number;

  @ApiProperty({ description: 'Кількість пропущених курсів за запитом', example: '0', required: false })
  @IsOptional()
  readonly skip?: number;

  // @ApiProperty({
  //   example: 'offline',
  //   description: 'String for search Course by online or offline format',
  //   required: false,
  // })
  // readonly format?: ;

}
