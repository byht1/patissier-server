import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export type CatalogDocument = Catalog & Document;

@Schema({ versionKey: false, timestamps: true })
export class Catalog {
  @ApiProperty({ example: '6373c0bca5a6e4c9556f1e7a' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Торти' })
  @Prop()
  category: string;

  @ApiProperty({ example: 'image url' })
  @Prop()
  url: string;

  @ApiProperty({ example: 'Булка “Равлик”' })
  @Prop()
  title: string;

  @ApiProperty({
    example: 'Ніжний заварний крем та зрусткк печиво...',
  })
  @Prop()
  description: string;

  @ApiProperty({
    example: '21,00 грн/шт',
  })
  @Prop()
  price: string;

  @ApiProperty({
    example: 'Склад',
  })
  @Prop()
  ingredients: string;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
