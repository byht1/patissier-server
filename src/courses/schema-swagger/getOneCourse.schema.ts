import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { ECourseType, ICourseDetails, ICourseProgram } from 'src/db-schemas/course.schema';

export class GetOneCourseSchema {
  @ApiProperty({ example: '6373c0bca5a6e4c9556f1e7a' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'courses' })
  type: ECourseType;

  @ApiProperty({ example: 'Торти' })
  category: string;

  @ApiProperty({ example: 'На курсі ви навчитеся...' })
  previewText: string;

  @ApiProperty({ example: 12 })
  totalPlaces: number;

  @ApiProperty({ example: '5 днів' })
  courseDuration: string;

  @ApiProperty({ example: 'Програма навчання розрахована для кондитерів-початківців...' })
  description: string;

  @ApiProperty({ example: ['first image url', 'second image url'] })
  images: string[];

  @ApiProperty({
    example: {
      details_1: {
        name: '5 днів практики',
        description: 'Кожного дня нова тематика й практичне відпрацювання теорії  в процесі приготування',
      },
      details_2: {
        name: 'Продукти та інвентар',
        description:
          'Професійні зали обладнано потрібною технікою, а перед початком навчального дня на столах вже знаходяться потрібні продукти',
      },
      details_3: {
        name: 'Додаткові переваги',
        description:
          'Надруковані технічні карти, сертифікат про проходження курсу, обід, коробка для тістечок, які ви приготуєте',
      },
    },
  })
  details: ICourseDetails;

  @ApiProperty({
    example: {
      program_1: { name: 'Теорія', description: 'Класичний рецепт випічки та глінтвейну' },
      program_2: { name: 'Бонус', description: 'за проходження майстер-класу' },
      program_3: { name: 'Онлайн', description: 'Всі відео-уроки в записі' },
    },
  })
  program: ICourseProgram;

  @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a', '645a1203e0d6ab750bae3414' ]})
  groups: mongoose.Schema.Types.ObjectId[];
}
