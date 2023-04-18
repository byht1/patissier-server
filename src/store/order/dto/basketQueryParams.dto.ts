import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import {
  errorMessageDto,
  selectProductReg,
  TValidateRequestFieldsSetting,
  ValidateRequestFields,
} from 'src/classValidator';
import { storColumnName } from 'src/db-schemas/product.schema';

const groupSelect: TValidateRequestFieldsSetting = {
  groupOne: ['pick_field'],
  groupTwo: ['omit_field'],
};

export enum EActionBasket {
  ADD = 'add',
  DELETE = 'delete',
}

export class BasketQueryParams {
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
    description: `Вказує на тип операції<br />
     <b>Доступні поля для вводу:</b> ${Object.values(EActionBasket).join(', ')}<br />`,
    default: EActionBasket.ADD,
  })
  @IsString({ message: errorMessageDto.notString })
  @IsEnum(EActionBasket, { message: `Повинне мати одне із значень ${Object.values(EActionBasket).join(', ')}` })
  readonly action: EActionBasket;
}
