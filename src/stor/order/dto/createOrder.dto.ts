import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { errorMessageDto, IsDateValid } from 'src/classValidator';
import { EContactTime, EDelivery, EPayment } from 'src/db-schemas/orders.schema';
import { nextWeekDate } from '../helpers';
import { timeReg } from '../../../classValidator/reg/time';

export class CreateOrderDto {
  @ApiProperty()
  @IsString({ message: errorMessageDto.notString })
  @MaxLength(30, { message: errorMessageDto.maxLength(30) })
  @MinLength(5, { message: errorMessageDto.minLength(5) })
  readonly fullName: string;

  @ApiProperty()
  @IsMobilePhone('uk-UA', { strictMode: true }, { message: 'Not a valid phone number' })
  readonly phone: string;

  @ApiProperty()
  @IsString({ message: errorMessageDto.notString })
  @MaxLength(200, { message: errorMessageDto.maxLength(200) })
  @MinLength(10, { message: errorMessageDto.minLength(10) })
  @IsOptional()
  readonly orderComment?: string;

  @ApiProperty()
  @IsEnum(EDelivery, { message: 'This delivery method does not exist' })
  readonly typeDelivery: EDelivery;

  @ApiProperty()
  @IsString({ message: errorMessageDto.notString })
  readonly deliveryAddress: string;

  @ApiProperty()
  @IsEnum(EContactTime, { message: 'Incorrect contact time' })
  readonly contactTimeString: EContactTime;

  @ApiProperty()
  @IsString({ message: errorMessageDto.notString })
  @IsDateValid({ minDate: new Date(), maxDate: nextWeekDate() })
  @IsOptional()
  readonly date?: string;

  @ApiProperty()
  @IsString({ message: errorMessageDto.notString })
  @Matches(timeReg.value, { message: timeReg.message })
  @IsOptional()
  readonly time?: string;

  @ApiProperty()
  @IsEnum(EPayment, { message: 'Non-existent payment method' })
  readonly payment: EPayment;

  @ApiProperty()
  @IsArray({ message: errorMessageDto.array.notArray })
  @ArrayMinSize(1, { message: errorMessageDto.array.minLength() })
  @IsString({ each: true, message: errorMessageDto.array.notString })
  readonly products: string[];
}
