import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, IsString, Matches } from 'class-validator';
import {
  errorMessageDto,
  idListReg,
  selectProductReg,
  TValidateRequestFieldsSetting,
  ValidateRequestFields,
} from 'src/classValidator';
import { storColumnName } from 'src/db-schemas/stor.schema';
import { convertorECategory, convertorETypeSortProducts, ECategory, ETypeSortProducts } from '../type';

const groupSelect: TValidateRequestFieldsSetting = {
  groupOne: ['pick_field'],
  groupTwo: ['omit_field'],
};

const groupSearchAndFilter: TValidateRequestFieldsSetting = {
  groupOne: ['id'],
  groupTwo: ['category', 'search', 'searchInput'],
};

const groupSearch: TValidateRequestFieldsSetting = {
  groupOne: ['searchInput'],
  groupTwo: ['search'],
  isEmpty: true,
};

export class GetProductsQueryParams {
  @ApiProperty({
    description: 'Пошук по id "НЕ ВИКОРИСТОВУЄТЬСЯ разом з полями category, search, searchInput"',
    example: '641380d06e5b74b37019d142,64137f6c6e5b74b37019d136',
    required: false,
  })
  @IsString({ message: errorMessageDto.notString })
  @Matches(idListReg.value, { message: idListReg.message })
  @ValidateRequestFields(groupSearchAndFilter)
  @IsOptional()
  readonly id?: string;

  @ApiProperty({
    description: `Випрати тільки потрібні поля: ${storColumnName.join(
      ', ',
    )} "НЕ ВИКОРИСТОВУЄТЬСЯ разом з полями omit_field"`,
    example: '_id,price',
    required: false,
  })
  @IsString({ message: errorMessageDto.notString })
  @ValidateRequestFields(groupSelect)
  @Matches(selectProductReg.value, { message: selectProductReg.message })
  @IsOptional()
  readonly pick_field?: string;

  @ApiProperty({
    description: `Випрати тільки потрібні поля: ${storColumnName.join(
      ', ',
    )} "НЕ ВИКОРИСТОВУЄТЬСЯ разом з полями pick_field"`,
    example: '_id,price',
    required: false,
  })
  @IsString({ message: errorMessageDto.notString })
  @ValidateRequestFields(groupSelect)
  @Matches(selectProductReg.value, { message: selectProductReg.message })
  @IsOptional()
  readonly omit_field?: string;

  @ApiProperty({
    description: `Категорія товару: ${convertorECategory(', ')} "НЕ ВИКОРИСТОВУЄТЬСЯ разом з полeм id"`,
    example: 'Десерт',
    required: false,
  })
  @IsString({ message: errorMessageDto.notString })
  @IsEnum(ECategory, { message: 'Such a category does not exist' })
  @ValidateRequestFields(groupSearchAndFilter)
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

  @ApiProperty({ description: 'Пошук "НЕ ВИКОРИСТОВУЄТЬСЯ разом з полeм id"', required: false })
  @IsString({ message: errorMessageDto.notString })
  @ValidateRequestFields(groupSearchAndFilter)
  @IsOptional()
  readonly search?: string;

  @ApiProperty({
    description: `Вибір поля для пошуку: ${storColumnName.join(', ')} "НЕ ВИКОРИСТОВУЄТЬСЯ БЕЗ полeм search"`,
    required: false,
    default: 'title',
  })
  @IsString({ message: errorMessageDto.notString })
  @IsEnum(storColumnName, { message: 'Such a category does not exist' })
  @ValidateRequestFields(groupSearch)
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
