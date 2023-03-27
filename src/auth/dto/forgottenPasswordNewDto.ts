import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';
import { passwordSchema } from './newUsersDto';

export class ForgottenPasswordNewDto {
  @ApiProperty({ example: 'Пароль користувача' })
  @IsString({ message: 'Повинен бути рядком' })
  @Matches(passwordSchema.number, {
    message: 'Пароль повинен містити одну цифру',
  })
  @Matches(passwordSchema.symbol, {
    message: 'Пароль повинен містити хоча б один спеціальний символ',
  })
  @Matches(passwordSchema.upperCase, {
    message: 'Пароль повинен містити хоча б одну велику літеру',
  })
  @Matches(passwordSchema.lowerCase, {
    message: 'Пароль повинен містити хоча б одну маленьку літеру',
  })
  @MinLength(7, { message: 'Мінімум 7 символ' })
  @Matches(passwordSchema.original, { message: 'Не валідний пароль' })
  readonly newPassword: string;
}
