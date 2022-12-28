import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class CreateCoursDto {
  @ApiProperty({
    example: 'Фруки',
    description: 'Category by courses',
  })
  @IsString({ message: 'Should be text' })
  readonly category: string;

  @ApiProperty({
    example: 'true',
    description: 'online or offline',
  })
  @IsBoolean({ message: 'Should be boolean' })
  readonly isOnline: boolean;
}
