import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({ versionKey: false, timestamps: true })
export class Course {
  @ApiProperty({ example: '6373c0bca5a6e4c9556f1e7a' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Торти' })
  @Prop({ type: String, required: true })
  category: string;

  @ApiProperty({ example: 'На курсі ви навчитеся...' })
  @Prop({ type: String, required: true })
  previewText: string;
  
  @ApiProperty({ example: 12 })
  @Prop({ type: Number, required: true })
  availablePlaceQuantity: number;

  @ApiProperty({ example: 5 })
  @Prop({ type: Number, required: true })
  courseDurationDays: number;

  @ApiProperty({ example: 'Програма навчання розрахована для кондитерів-початківців...' })
  @Prop({ type: String, required: true })
  description: string;

  @ApiProperty({ example: ['image url'] })
  @Prop({ type: [String], required: true }) // here
  images: string[];

  @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  @Prop({ type: String, required: true })
  groups: mongoose.Schema.Types.ObjectId[]; // переробити на online/offline, ref: 'Group'

  // @ApiProperty({ example: 'true' })
  // @Prop({ type: Boolean, required: true })
  // isOnline: boolean;

  // @ApiProperty({
  //   example: 'На курсі ви навчитеся працювати з різними видами тіста',
  // })
  // @Prop({ type: String, required: true })
  // comments: string;

  // @ApiProperty({
  //   example: '12 осіб',
  // })
  // @Prop({ type: String, required: true })
  // group : string;

  // @ApiProperty({
  //   example: '5 днів',
  // })
  // @Prop({ type: String, required: true })
  // timeframe: string;

  // @ApiProperty({
  //   example: 'mm/dd/yyyy',
  // })
  // @Prop({ type: Number, required: true })
  // startDate: number;

  // @ApiProperty({
  //   example: '5000',
  // })
  // @Prop({ type: Number, required: true })
  // price: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
