import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// * - можливо поміняти description

export class CreateCourseDto {
  @ApiProperty({
    example: 'Торти',
    description: 'Категорія курсів',
  })
  @IsString({ message: 'Should be text' })
  readonly category: string;

  @ApiProperty({
    example: 'На курсі ви навчитеся працювати з різними видами тіста...',
    description: '*preview Text',
  })
  readonly previewText: string;

  // @ApiProperty({
  //   example: 'На курсі ви навчитеся працювати з різними видами тіста...',
  //   description: '*preview Text',
  // })
  // readonly images: string[];

  @ApiProperty({
    example: 12,
    description: '*Загальна кількість місць на курс даної категорії',
  })
  readonly availablePlaceQuantity: number;

  @ApiProperty({
    example: 5,
    description: '*Тривалість курсів (к-сть днів)',
  })
  readonly courseDurationDays: number;

  @ApiProperty({
    example: 'Програма навчання розрахована як для кондитерів-початківців, так і для тих, хто хоче підвищити рівень своєї майстерності.',
    description: '*Повний детальний опис курсу (даної категорії)',
  })
  readonly description: string;
}
