import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class EmailDto {
  @ApiProperty({ example: 'Email користувача' })
  @IsString({ message: 'Start date a course' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;
}
