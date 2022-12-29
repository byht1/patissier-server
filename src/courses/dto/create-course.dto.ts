import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    example: 'Торти',
    description: 'Category by course',
  })
  @IsString({ message: 'Should be text' })
  readonly category: string;

  @ApiProperty({
    example: '02/12/2023',
    description: 'Start date a course',
  })
  @IsString({ message: 'Should be text' })
  readonly startDate: string;

  @ApiProperty({
    example: 'true',
    description: 'online or offline',
  })
  @IsBoolean({ message: 'Should be boolean' })
  readonly isOnline: boolean;
}
