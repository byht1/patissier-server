import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export const enum EType { // переназвати
  COURSE = 'Курс',
  MASTER_CLASS = 'Майстер-клас',
}

interface IProgram {
  schedule: string,
  productsAndInventory: string,
  additionalBenefits: string,
}

export type CourseDocument = Course & Document;

@Schema({ versionKey: false, timestamps: true })
export class Course {
  @ApiProperty({ example: '6373c0bca5a6e4c9556f1e7a' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Курс' })
  type: EType;

  @ApiProperty({ example: 'Торти' })
  @Prop({ type: String, required: true })
  category: string;

  @ApiProperty({ example: 'На курсі ви навчитеся...' })
  @Prop({ type: String, required: true })
  previewText: string;
  
  @ApiProperty({ example: 12 })
  @Prop({ type: Number, required: true })
  totalPlaces: number;

  @ApiProperty({ example: 5 })
  @Prop({ type: Number, required: true })
  courseDurationDays: number;

  @ApiProperty({ example: 'Програма навчання розрахована для кондитерів-початківців...' })
  @Prop({ type: String, required: true })
  description: string;

  @ApiProperty({ example: ['image url'] })
  @Prop({ type: [String], required: true }) // here
  images: string[];

  @ApiProperty({ example: {
    schedule: "Кожного дня нова тематика й практичне відпрацювання теорії  в процесі приготування",
    productsAndInventory: "Професійні зали обладнано потрібною технікою, а перед початком навчального дня на столах вже знаходяться потрібні продукти",
    additionalBenefits: "Надруковані технічні карти, сертифікат про проходження курсу, обід, коробка для тістечок, які ви приготуєте"
  } })
  program: IProgram; // or 'details' with program[] inside

  @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  @Prop({ type: String, required: true })
  groups: mongoose.Schema.Types.ObjectId[]; // переробити на online/offline, ref: 'Group'
}

export const CourseSchema = SchemaFactory.createForClass(Course);
