import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    example: 'Фруки',
    description: 'Category by course',
  })
  @IsString({ message: 'Should be text' })
  readonly category: string;

  @ApiProperty({
    example: '12/15/2022',
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
