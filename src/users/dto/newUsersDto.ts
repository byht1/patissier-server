import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Matches } from 'class-validator';

const passwordRegexp =
  /(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_]{7,}/g;

// (?=.*[0-9]) - строка содержит хотя бы одно число;
// (?=.*[!@#$%^&*]) - строка содержит хотя бы один спецсимвол;
// (?=.*[a-z]) - строка содержит хотя бы одну латинскую букву в нижнем регистре;
// (?=.*[A-Z]) - строка содержит хотя бы одну латинскую букву в верхнем регистре;
// [0 - 9a - zA - Z!@#$%^&*]{ 6,} - строка состоит не менее, чем из 6 вышеупомянутых символов

export class NewUserDto {
  @ApiProperty({ example: 'Логін користувача' })
  @IsString({ message: 'Should be text' })
  readonly username: string;

  @ApiProperty({ example: 'Пароль користувача' })
  @IsString({ message: 'Should be text' })
  @Matches(passwordRegexp, { message: 'Incorrect password' })
  readonly password: string;

  @ApiProperty({ example: 'Email користувача' })
  @IsString({ message: 'Start date a course' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;
}
