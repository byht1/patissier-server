import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({ versionKey: false, timestamps: true })
export class Course {
  @ApiProperty({ example: '6373c0bca5a6e4c9556f1e7a' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Торти' })
  @Prop()
  category: string;

  @ApiProperty({ example: 'image url' })
  @Prop()
  url: string;

  @ApiProperty({ example: 'true' })
  @Prop()
  isOnline: boolean;

  // @ApiProperty({
  //   example: 'На курсі ви навчитеся працювати з різними видами тіста',
  // })
  // @Prop()
  // comments: string;

  // @ApiProperty({
  //   example: '12 осіб',
  // })
  // @Prop()
  // group : string;

  // @ApiProperty({
  //   example: '5 днів',
  // })
  // @Prop()
  // timeframe: string;

  // @ApiProperty({
  //   example: '56358365837547',
  // })
  // @Prop()
  // startDate: number;

  // @ApiProperty({
  //   example: '5000',
  // })
  // @Prop()
  // price: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
