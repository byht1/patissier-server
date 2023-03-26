import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, IsString, Matches } from 'class-validator';
import {
  errorMessageDto,
  idListReg,
  selectProductReg,
  TValidateRequestFieldsSetting,
  ValidateRequestFields,
} from 'src/classValidator';
import { storColumnName } from 'src/db-schemas/store.schema';
import { convertorECategory, ECategory, ETypeSortProducts, sortExplanationSwagger } from '../type';

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

export class GetAllProductsQueryParams {
  @ApiProperty({
    description: 'Пошук по id <br /><b>НЕ ВИКОРИСТОВУЄТЬСЯ разом з полями category, search, searchInput</b>',
    example: '641380d06e5b74b37019d142,64137f6c6e5b74b37019d136',
    required: false,
  })
  @IsString({ message: errorMessageDto.notString })
  @Matches(idListReg.value, { message: idListReg.message })
  @ValidateRequestFields(groupSearchAndFilter)
  @IsOptional()
  readonly id?: string;

  @ApiProperty({
    description: `Вибір необхідних полів для відповіді сервера<br /> 
    <b>Приклад:</b> ...?pick_field=_id,price то сервер надасть відповідь лише з цими полями <br />
    <b>Доступні поля для вводу:</b> ${storColumnName.join(', ')}<br />
    <b>НЕ ВИКОРИСТОВУЄТЬСЯ разом з полем omit_field</b>`,
    example: '_id,price',
    required: false,
  })
  @IsString({ message: errorMessageDto.notString })
  @ValidateRequestFields(groupSelect)
  @Matches(selectProductReg.value, { message: selectProductReg.message })
  @IsOptional()
  readonly pick_field?: string;

  @ApiProperty({
    description: `Виключення полів з відповіді сервера<br />
    <b>Приклад:</b> ...?omit_field=_id,price то сервер надасть відповідь без цих полів <br />
    <b>Доступні поля для вводу:</b> ${storColumnName.join(', ')}<br />
    <b>НЕ ВИКОРИСТОВУЄТЬСЯ разом з полями pick_field</b>`,
    example: '_id,price',
    required: false,
  })
  @IsString({ message: errorMessageDto.notString })
  @ValidateRequestFields(groupSelect)
  @Matches(selectProductReg.value, { message: selectProductReg.message })
  @IsOptional()
  readonly omit_field?: string;

  @ApiProperty({
    description: `Вибір по категорії<br />
    <b>Приклад:</b> ...?category=Десерт то сервер надасть відповідь лише цієї категорії<br />
    <b>Доступні поля для вводу:</b> ${convertorECategory(', ')}<br />
    <b>НЕ ВИКОРИСТОВУЄТЬСЯ разом з полeм id</b>`,
    example: 'Десерт',
    required: false,
  })
  @IsString({ message: errorMessageDto.notString })
  @IsEnum(ECategory, { message: 'This category does not exist' })
  @ValidateRequestFields(groupSearchAndFilter)
  @IsOptional()
  readonly category?: ECategory;

  @ApiProperty({
    description: `Сортування товару: <br />${sortExplanationSwagger()}`,
    required: false,
    default: ETypeSortProducts.POPULAR,
  })
  @IsString({ message: errorMessageDto.notString })
  @IsEnum(ETypeSortProducts, { message: 'This category does not exist' })
  @IsOptional()
  readonly sort?: string;

  @ApiProperty({ description: 'Пошук <br /><b>НЕ ВИКОРИСТОВУЄТЬСЯ разом з полeм id</b>', required: false })
  @IsString({ message: errorMessageDto.notString })
  @ValidateRequestFields(groupSearchAndFilter)
  @IsOptional()
  readonly search?: string;

  @ApiProperty({
    description: `Вибір поля для пошуку:<br />
    <b>Доступні поля для вводу:</b> ${convertorECategory(', ')}<br />
    <b>НЕ ВИКОРИСТОВУЄТЬСЯ БЕЗ полeм search</b>`,
    required: false,
    default: 'title',
  })
  @IsString({ message: errorMessageDto.notString })
  @IsEnum(storColumnName, { message: 'This category does not exist' })
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
