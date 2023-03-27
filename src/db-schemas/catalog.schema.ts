import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export type CatalogDocument = Catalog & Document;

@Schema({ versionKey: false, timestamps: true })
export class Catalog {
  @ApiProperty({ example: '6373c0bca5a6e4c9556f1e7a' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Торти' })
  @Prop({ type: String, required: true })
  category: string;

  @ApiProperty({ example: 'image url' })
  @Prop({ type: String, required: true })
  url: string;

  @ApiProperty({ example: 'Булка “Равлик”' })
  @Prop({ type: String, required: true })
  title: string;

  @ApiProperty({
    example: 'Ніжний заварний крем та хрусткий печиво...',
  })
  @Prop({ type: String, required: true })
  description: string;

  @ApiProperty({
    example: 21.5,
  })
  @Prop({ type: Number, required: true })
  price: number;

  @ApiProperty({
    example: 'Склад',
  })
  @Prop({ type: String, required: true })
  ingredients: string;

  @ApiProperty({
    example: 'true',
  })
  @Prop({ type: Boolean, default: true })
  isAvailable: boolean;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
