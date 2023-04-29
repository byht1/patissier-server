import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";
import { ECourseType, ICourseDetails } from "src/db-schemas/course.schema";
import { Group } from "src/db-schemas/group.schema";

export class GetAllCoursesSchema {
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

  @ApiProperty({ example: {
    schedule: "Кожного дня нова тематика й практичне відпрацювання теорії в процесі приготування",
    productsAndInventory: "Професійні зали обладнано потрібною технікою, а перед початком навчального дня на столах вже знаходяться потрібні продукти",
    additionalBenefits: "Надруковані технічні карти, сертифікат про проходження курсу, обід, коробка для тістечок, які ви приготуєте"
  } })
  program: ICourseDetails; // or 'details' with program[] inside

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