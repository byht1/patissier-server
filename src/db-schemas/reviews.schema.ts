import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ versionKey: false, timestamps: true })
export class Review {
  @ApiProperty({ example: '6373c0bca5a6e4c9556f1e7a' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Товар' })
  @Prop({ type: String, required: true })
  category: string;

  @ApiProperty({ example: 'image url' })
  @Prop({ type: String, required: true })
  avatar: string;

  @ApiProperty({ example: 'Оксана К.' })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({
    example:
      'Дівчата, ці тістечка посто бомба-ракєта!!! Нарешті дійшов мій марципан, і я одразу приготувала, тому тепер я в графіку і в ногу з іншими учасниками курсу.',
  })
  @Prop({ type: String, required: true })
  comments: string;

  @ApiProperty({
    example: 'Склад',
  })
  @Prop({ type: Date, required: true })
  date: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
