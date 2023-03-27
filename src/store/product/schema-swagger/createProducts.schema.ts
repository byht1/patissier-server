import { ApiProperty } from '@nestjs/swagger';
import { ECategory } from 'src/db-schemas/product.schema';
import { convertorECategory } from '../type';

export class CreateProductSwaggerSchema {
  @ApiProperty({ description: 'Заголовок товару' })
  readonly title: string;

  @ApiProperty({ description: 'Ціна товару' })
  readonly price: string;

  @ApiProperty({ description: `Категорія товару: ${convertorECategory(', ')}`, enum: ECategory })
  readonly category: ECategory;

  @ApiProperty({ description: 'Опис товару' })
  readonly description: string;

  @ApiProperty({ description: 'Склад товару' })
  readonly composition: string;

  @ApiProperty({
    type: 'array',
    description: 'Фото товару',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  readonly picture: string[];

  @ApiProperty({
    type: 'array',
    description: 'id схожого товару',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: false,
  })
  readonly similar_products: string[];
}
