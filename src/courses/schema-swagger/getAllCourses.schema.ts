import { ApiProperty } from "@nestjs/swagger";
import { CourseDocument } from "src/db-schemas/course.schema";

export class GetAllCoursesSchema {
  @ApiProperty({ example: '12' })
  total: number;

  @ApiProperty({
    example: [{
      _id: '64371e7f6bf0ecb4ba9f4247',
      type: 'Курс',
      category: 'Торти',
      previewText: 'На курсі ви навчитеся...',
      totalPlaces: 12,
      courseDurationDays: 5,
      description: 'Програма навчання розрахована як для кондитерів-початківців...',
      images: [
        "first image url",
        "second image url"
      ],
      details: {
        details_1: { name: "5 днів практики", description: "Кожного дня нова тематика й практичне відпрацювання теорії  в процесі приготування" },
        details_2: { name: "Продукти та інвентар", description: "Професійні зали обладнано потрібною технікою, а перед початком навчального дня на столах вже знаходяться потрібні продукти" },
        details_3: { name: "Додаткові переваги", description: "Надруковані технічні карти, сертифікат про проходження курсу, обід, коробка для тістечок, які ви приготуєте" },
      },
      program: {
        program_1: { name: "Теорія", description: "Класичний рецепт випічки та глінтвейну" },
        program_2: { name: "Бонус", description: "за проходження майстер-класу" },
        program_3: { name: "Онлайн", description: "Всі відео-уроки в записі" },
      },
      groups: {
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
      }
  }]})
  data: CourseDocument[]
}