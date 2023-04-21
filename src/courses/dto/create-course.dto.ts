import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumberString, IsString, Matches } from 'class-validator';
import { EType } from 'src/db-schemas/course.schema';
// * - можливо поміняти description

export class CreateCourseDto {
  @ApiProperty({
    example: 'course',
    description: 'Тип: "Курс" або "Майстер-клас"',
  })
  @IsEnum(EType, { message: 'This type does not exist' })
  @Matches(/^\s*\S/, { message: 'type should not be empty' })
  readonly type: EType;

  @ApiProperty({
    example: 'Торти',
    description: 'Категорія курсу',
  })
  @Matches(/^\s*\S/, { message: 'category should not be empty' })
  @IsString({ message: 'Should be text' })
  readonly category: string;

  @ApiProperty({
    example: 'На курсі ви навчитеся працювати з різними видами тіста...',
    description: 'Короткий текст-прев\'ю',
  })
  @Matches(/^\s*\S/, { message: 'previewText should not be empty' })
  readonly previewText: string;

  @ApiProperty({
    example: 12,
    description: '*Загальна кількість місць на курс даної категорії', // (поточної)
  })
  @IsNumberString({}, {message: 'totalPlaces must be a number'}) // ... conforming to the specified constraints
  @IsNotEmpty()
  readonly totalPlaces: number;

  @ApiProperty({
    example: 5,
    description: '*Тривалість курсу (к-сть днів)',
  })
  @IsNumberString({}, { message: 'courseDurationDays must be a number' })
  @IsNotEmpty()
  readonly courseDurationDays: number;

  @ApiProperty({
    example: 'Програма навчання розрахована як для кондитерів-початківців, так і для тих, хто хоче підвищити рівень своєї майстерності.',
    description: 'Повний детальний опис курсу даної категорії',
  })
  @Matches(/^\s*\S/, { message: 'description should not be empty' })
  readonly description: string;
}
