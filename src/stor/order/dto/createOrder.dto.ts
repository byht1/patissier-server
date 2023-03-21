import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { errorMessageDto, IsDateValid } from 'src/classValidator';
import { EContactTime, EDelivery, EPayment } from 'src/db-schemas/orders.schema';
import { dateNextWeek } from '../helpers';

export class CreateOrderDto {
  @IsString({ message: errorMessageDto.notString })
  @MaxLength(30, { message: errorMessageDto.maxLength(30) })
  @MinLength(5, { message: errorMessageDto.minLength(5) })
  readonly fullName: string;

  @IsMobilePhone('uk-UA', { strictMode: true }, { message: 'Not a valid phone number' })
  readonly phone: string;

  @IsString({ message: errorMessageDto.notString })
  @MaxLength(200, { message: errorMessageDto.maxLength(200) })
  @MinLength(10, { message: errorMessageDto.minLength(10) })
  @IsOptional()
  readonly orderComment?: string;

  @IsEnum(EDelivery, { message: 'Non-existent delivery method' })
  readonly typeDelivery: EDelivery;

  @IsString({ message: errorMessageDto.notString })
  readonly deliveryAddress: string;

  @IsEnum(EContactTime, { message: 'Incorrect co-tact time' })
  readonly contactTimeString: EContactTime;

  @IsString({ message: errorMessageDto.notString })
  @IsDateValid({ minDate: new Date(), maxDate: dateNextWeek() })
  @IsOptional()
  readonly date?: string;

  //FIXME: згенерувати регулярний вираз для перевірки формату
  @IsString({ message: errorMessageDto.notString })
  @IsOptional()
  readonly time?: string;

  @IsEnum(EPayment, { message: 'Non-existent payment method' })
  readonly payment: EPayment;

  @IsArray({ message: errorMessageDto.array.notArray })
  @ArrayMinSize(1, { message: errorMessageDto.array.minLength() })
  @IsString({ each: true, message: errorMessageDto.array.notString })
  readonly products: string[];
}
