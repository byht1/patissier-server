import { IsString, IsEnum, MinLength, IsOptional, IsArray, ArrayMinSize, IsNumberString } from 'class-validator';
import { errorMessageDto, priceReg } from 'src/classValidator';
import { ECategory } from '../type';

export class CreateProductDto {
  @IsString({ message: errorMessageDto.notString })
  readonly title: string;

  @IsString({ message: errorMessageDto.notString })
  @IsNumberString({}, { message: priceReg.message })
  readonly price: string;

  @IsEnum(ECategory, { message: 'Such a category does not exist' })
  readonly category: ECategory;

  @IsString({ message: errorMessageDto.notString })
  @MinLength(10, {
    message: errorMessageDto.minLength(10),
  })
  readonly description: string;

  @IsString({ message: errorMessageDto.notString })
  @MinLength(10, {
    message: errorMessageDto.minLength(10),
  })
  readonly composition: string;

  @IsArray({ message: errorMessageDto.array.notArray })
  @ArrayMinSize(1, { message: errorMessageDto.array.minLength() })
  @IsString({ each: true, message: errorMessageDto.array.notString })
  @IsOptional()
  readonly similar_products?: string[];
}
