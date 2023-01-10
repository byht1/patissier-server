import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LogInDto {
  @ApiProperty({ example: 'Логін користувача' })
  @IsString({ message: 'Should be text' })
  readonly login: string;

  @ApiProperty({ example: 'Пароль користувача' })
  @IsString({ message: 'Should be text' })
  readonly password: string;
}
