import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { IsBoolean, IsString } from 'class-validator/types/decorator/decorators';

export class SearchCourseDto {
  @ApiProperty({
    example: 'true',
    description: 'String for search breed by online offline',
  })
  @IsString({ message: 'Should be text' })
  readonly online: string;
}
