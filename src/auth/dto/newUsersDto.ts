import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Matches, MinLength } from 'class-validator';

export const passwordSchema = Object.freeze({
  upperCase: /(?=.*[A-Z])/,
  lowerCase: /(?=.*[a-z])/,
  symbol: /(?=.*[!@#$%^&*_])/,
  number: /(?=.*[0-9])/,
  min: /[0-9a-zA-Z!@#$%^&*_]{7,}/,
  original:
    /(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_]{7,}/g,
});

export class NewUserDto {
  @ApiProperty({ example: 'Логін користувача' })
  @IsString({ message: 'Should be text' })
  readonly username: string;

  @ApiProperty({ example: 'Email користувача' })
  @IsString({ message: 'Start date a course' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

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
  readonly password: string;
}
