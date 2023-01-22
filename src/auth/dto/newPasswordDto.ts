import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';
import { passwordSchema } from './newUsersDto';

export class NewPasswordDto {
  @ApiProperty({ example: 'Currency password' })
  @IsString({ message: 'Start date a course' })
  readonly password: string;

  @ApiProperty({ example: 'Пароль користувача' })
  @IsString({ message: 'Повинен бути рядком' })
  @Matches(passwordSchema.number, {
    message: 'Пароль повинен містити одну цифру',
  })
  @Matches(passwordSchema.symbol, {
    message: 'Пароль повинен містити хотяби один сцец символ',
  })
  @Matches(passwordSchema.upperCase, {
    message: 'Пароль повинен містити хотяби одиу велику літеру',
  })
  @Matches(passwordSchema.lowerCase, {
    message: 'Пароль повинен містити хотяби одиу маленьку літеру',
  })
  @MinLength(7, { message: 'Мінімум 7 симфолів' })
  @Matches(passwordSchema.original, { message: 'Не валідний пароль' })
  readonly newPassword: string;
}
