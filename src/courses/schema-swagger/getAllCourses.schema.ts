import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";
import { DetailsObject, ECourseType, ProgramObject } from "src/db-schemas/course.schema";
import { Group } from "src/db-schemas/group.schema";

export class GetAllCoursesSchema {
  @ApiProperty({ example: '5' })
  total: number;

  @ApiProperty({ example: '64371e7f6bf0ecb4ba9f4247' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Курс' })
  type: ECourseType;

  @ApiProperty({ example: 'Торти' })
  category: string;

  @ApiProperty({ example: 'На курсі ви навчитеся...' })
  previewText: string;
  
  @ApiProperty({ example: 12 })
  totalPlaces: number;

  @ApiProperty({ example: 5 })
  courseDurationDays: number;

  @ApiProperty({ example: 'Програма навчання розрахована для кондитерів-початківців...' })
  description: string;

  @ApiProperty({ example: ['images url'] })
  images: string[];

  @ApiProperty({
    example: {
      description: {
        description_1: { name: "5 днів практики", description: "Кожного дня нова тематика й практичне відпрацювання теорії  в процесі приготування" },
        description_2: { name: "Продукти та інвентар", description: "Професійні зали обладнано потрібною технікою, а перед початком навчального дня на столах вже знаходяться потрібні продукти" },
        description_3: { name: "Додаткові переваги", description: "Надруковані технічні карти, сертифікат про проходження курсу, обід, коробка для тістечок, які ви приготуєте" },
      }
  }})
  details: DetailsObject;

  @ApiProperty({
    example: {
      program: {
        program_1: { name: "Теорія", description: "Класичний рецепт випічки та глінтвейну" },
        program_2: { name: "Бонус", description: "за проходження майстер-класу" },
        program_3: { name: "Онлайн", description: "Всі відео-уроки в записі" },
      }
    }})
  program: ProgramObject;

  @ApiProperty({ example: [{
    _id: '64372d14dc718e6f6fc04350',
    type: 'online',
    course: '64371e7f6bf0ecb4ba9f4247',
    days: {
        start: '07.09.2023',
        end: '11.09.2023'
    },
    time: {
        from: '10:00',
        to: '14:00'
    },
    price: 2000,
    clientIds: ['6373c0bca5a6e4c9556f1e7a'],
    video: 'video url',
  }] })
  groups: Group[];
}