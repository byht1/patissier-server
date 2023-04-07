import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

class ProductBasket {
  @ApiProperty({ example: '6373c0bca5a6e4c9556f1e7a' })
  _id: ObjectId;

  @ApiProperty({ example: 'Булка “Равлик”' })
  title: string;

  @ApiProperty({ example: 20 })
  price: number;

  @ApiProperty({ example: 'Булка' })
  category: string;

  @ApiProperty({ example: 'Опис ...' })
  description: string;

  @ApiProperty({ example: 'Склад товару ...' })
  ingredients: string;

  @ApiProperty({ example: ['Посилання на фото'] })
  picture: string[];
}

export class Basket {
  @ApiProperty({ type: [ProductBasket] })
  basket: ProductBasket[];
}
