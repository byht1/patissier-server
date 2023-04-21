import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { EType } from 'src/db-schemas/course.schema';

export class SearchDto {
  @ApiProperty({
    example: 'course',
    description: '',
    required: false,
  })
  @IsString({ message: 'Should be text' })
  readonly type?: EType;

  @ApiProperty({ description: 'Course quantity per page', example: '3', required: false })
  readonly count?: number;

  @ApiProperty({ description: 'Quantity of skipped courses for the request', example: '0', required: false })
  @IsOptional()
  readonly offset?: number;

  // @ApiProperty({
  //   example: 'offline',
  //   description: 'String for search Course by online or offline format',
  //   required: false,
  // })
  // readonly format?: ;

}
