import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export enum ECategory {
  CAKES = 'Торт',
  DESSERTS = 'Десерт',
  COOKIES = 'Печиво',
  BUNS = 'Булка',
  PIES = 'Пирог',
}

export type ProductDocument = Product & Document;

@Schema({ versionKey: false, timestamps: true })
export class Product {
  @ApiProperty({ example: '6373c0bca5a6e4c9556f1e7a' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Булка “Равлик”' })
  @Prop({ type: String, required: true })
  title: string;

  @ApiProperty({ example: 20 })
  @Prop({ type: Number, required: true })
  price: number;

  @ApiProperty({ example: 'Булка' })
  @Prop({ type: String, required: true, enum: Object.values(ECategory) })
  category: ECategory;

  @ApiProperty({ example: 'Опис ...' })
  @Prop({ type: String, required: true })
  description: string;

  @ApiProperty({ example: 'Склад товару ...' })
  @Prop({ type: String, required: true })
  ingredients: string;

  @ApiProperty({ example: ['Посилання на фото'] })
  @Prop({ type: [String], required: true })
  picture: string[];

  @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stor' }],
    default: [],
  })
  similar_products: Product[];

  @ApiProperty({ example: 30 })
  @Prop({ type: Number, default: 0 })
  likes: number;

  @ApiProperty({ example: 40 })
  @Prop({ type: Number, default: 0 })
  orders: number;
}

export type StorColumnName = keyof Product;
export const storColumnName: StorColumnName[] = [
  '_id',
  'category',
  'ingredients',
  'description',
  'likes',
  'orders',
  'picture',
  'price',
  'similar_products',
  'title',
];

export const ProductSchema = SchemaFactory.createForClass(Product);
