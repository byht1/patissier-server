import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export enum ECourseType { // переназвати
  COURSE = 'Курс',
  MASTER_CLASS = 'Майстер-клас',
}

type StringObject = {
  [key: string]: string;
}

// let programEx: [StringObject, StringObject, StringObject]

export interface DetailsObject {
  details_1: StringObject;
  details_2: StringObject;
  details_3: StringObject;
}

export interface ProgramObject {
  program_1: StringObject;
  program_2: StringObject;
  program_3: StringObject;
}

export type CourseDocument = Course & Document;

@Schema({ versionKey: false, timestamps: true })
export class Course {
  @ApiProperty({ example: '6373c0bca5a6e4c9556f1e7a' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Курс' })
  @Prop({ type: String, enum: Object.values(ECourseType), required: true }) // here
  type: ECourseType;

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

  @ApiProperty({
    example: {
      description: {
        description_1: { name: "5 днів практики", description: "Кожного дня нова тематика й практичне відпрацювання теорії  в процесі приготування" },
        description_2: { name: "Продукти та інвентар", description: "Професійні зали обладнано потрібною технікою, а перед початком навчального дня на столах вже знаходяться потрібні продукти" },
        description_3: { name: "Додаткові переваги", description: "Надруковані технічні карти, сертифікат про проходження курсу, обід, коробка для тістечок, які ви приготуєте" },
      }
    }
  })
  @Prop({ type: Object, required: true }) // here
  details: DetailsObject;

  @ApiProperty({
    example: {
      program: {
        program_1: { name: "Теорія", description: "Класичний рецепт випічки та глінтвейну" },
        program_2: { name: "Бонус", description: "за проходження майстер-класу" },
        program_3: { name: "Онлайн", description: "Всі відео-уроки в записі" },
      }
    }
  })
  @Prop({ type: Object, required: true }) // here
  program: ProgramObject;
  
  @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}]})
  groups: mongoose.Schema.Types.ObjectId[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
