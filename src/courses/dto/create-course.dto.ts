import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { EType } from 'src/db-schemas/course.schema';
// * - можливо поміняти description

export class CreateCourseDto {
  @ApiProperty({
    example: 'course',
    description: 'Тип: "Курс" або "Майстер-клас"',
  })
  @IsString({ message: 'Should be text' })
  readonly type: EType;

  @ApiProperty({
    example: 'Торти',
    description: 'Категорія курсу',
  })
  @IsString({ message: 'Should be text' })
  readonly category: string;

  @ApiProperty({
    example: 'На курсі ви навчитеся працювати з різними видами тіста...',
    description: 'Короткий текст-прев\'ю',
  })
  readonly previewText: string;

  @ApiProperty({
    example: 12,
    description: '*Загальна кількість місць на курс даної категорії', // (поточної)
  })
  readonly totalPlaces: number;

  @ApiProperty({
    example: 5,
    description: '*Тривалість курсів (к-сть днів)',
  })
  readonly courseDurationDays: number;

  @ApiProperty({
    example: 'Програма навчання розрахована як для кондитерів-початківців, так і для тих, хто хоче підвищити рівень своєї майстерності.',
    description: 'Повний детальний опис курсу даної категорії',
  })
  readonly description: string;
}
