import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Matches, MinLength, IsMobilePhone } from 'class-validator';

export const passwordSchema = Object.freeze({
  upperCase: /(?=.*[A-Z])/,
  lowerCase: /(?=.*[a-z])/,
  symbol: /(?=.*[!@#$%^&*_])/,
  number: /(?=.*[0-9])/,
  min: /[0-9a-zA-Z!@#$%^&*_]{7,}/,
  original: /(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_]{7,}/,
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
    message: 'Пароль повинен містити хоча б один спеціальний символ',
  })
  @Matches(passwordSchema.upperCase, {
    message: 'Пароль повинен містити хоча б один велику літеру',
  })
  @Matches(passwordSchema.lowerCase, {
    message: 'Пароль повинен містити хоча б один маленьку літеру',
  })
  @MinLength(7, { message: 'Мінімум 7 символ' })
  @Matches(passwordSchema.original, { message: 'Не валідний пароль' })
  readonly password: string;

  @ApiProperty({ example: '+380961122333' })
  @IsString({ message: 'Not a line' })
  @IsMobilePhone('uk-UA', { strictMode: true }, { message: 'Not a valid phone number' })
  readonly phone: string;
}
