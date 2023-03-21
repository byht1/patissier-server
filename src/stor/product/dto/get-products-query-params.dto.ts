import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, IsString, Matches } from 'class-validator';
import { errorMessageDto, idListReg, selectProductReg } from 'src/classValidator';
import { Stor, storColumnName } from 'src/db-schemas/stor.schema';
import { convertorECategory, convertorETypeSortProducts, ECategory, ETypeSortProducts } from '../type';

export class GetProductsQueryParams {
  @ApiProperty({
    description: 'Пошук по id "НЕ ВИКОРИСТОВУВАТИ З ДРУГИМИ ПАРАМЕТРАМИ ПОШУКУ"',
    example: '641380d06e5b74b37019d142,64137f6c6e5b74b37019d136',
    required: false,
  })
  @IsString({ message: errorMessageDto.notString })
  @Matches(idListReg.value, { message: idListReg.message })
  @IsOptional()
  readonly id?: string;

  @ApiProperty({
    description: `Випрати тільки потрібні поля: ${storColumnName.join(', ')}`,
    example: '_id,price',
    required: false,
  })
  @IsString({ message: errorMessageDto.notString })
  @Matches(selectProductReg.value, { message: selectProductReg.message })
  @IsOptional()
  readonly select?: string;

  @ApiProperty({ description: `Категорія товару: ${convertorECategory(', ')}`, example: 'Десерт', required: false })
  @IsString({ message: errorMessageDto.notString })
  @IsEnum(ECategory, { message: 'Such a category does not exist' })
  @IsOptional()
  readonly category?: ECategory;

  @ApiProperty({
    description: `Сортування товару: ${convertorETypeSortProducts(', ')}`,
    required: false,
    default: ETypeSortProducts.POPULAR,
  })
  @IsString({ message: errorMessageDto.notString })
  @IsEnum(ETypeSortProducts, { message: 'Such a category does not exist' })
  @IsOptional()
  readonly sort?: string;

  @ApiProperty({ description: 'Пошук', required: false })
  @IsString({ message: errorMessageDto.notString })
  @IsOptional()
  readonly search?: string;

  @ApiProperty({ description: 'поле для пошуку', required: false, default: 'title' })
  @IsString({ message: errorMessageDto.notString })
  @IsOptional()
  readonly searchInput?: string;

  @ApiProperty({ description: 'Номер сторінки', required: false, default: 1 })
  @IsNumberString({ no_symbols: true })
  @IsOptional()
  readonly page?: string;

  @ApiProperty({ description: 'Товарів на 1 сторінці', required: false, default: 9 })
  @IsNumberString({ no_symbols: true })
  @IsOptional()
  readonly limit?: string;
}
