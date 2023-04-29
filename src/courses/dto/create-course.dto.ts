import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumberString, IsString, Matches } from 'class-validator';
import { errorMessageDto } from 'src/classValidator';
import { ECourseType } from 'src/db-schemas/course.schema';
import { fieldsValid } from '../helpers/validation';
// * - можливо поміняти description

export class CreateCourseDto {
  @ApiProperty({
    example: 'Курс',
    description: 'Тип: "Курс" або "Майстер-клас"',
  })
  @IsEnum(ECourseType, { message: 'This type does not exist' })
  @Matches(/^\s*\S/, { message: 'type should not be empty' })
  readonly type: ECourseType;

  @ApiProperty({
    example: 'Торти',
    description: 'Категорія курсу',
  })
  @Matches(fieldsValid.allowedCharacters.value, { message: fieldsValid.allowedCharacters.message })
  @Matches(/^\s*\S/, { message: 'category should not be empty' })
  @IsString({ message: errorMessageDto.notString })
  readonly category: string;

  @ApiProperty({
    example: 'На курсі ви навчитеся працювати з різними видами тіста...',
    description: 'Короткий текст-прев\'ю',
  })
  @Matches(/^\s*\S/, { message: 'previewText should not be empty' })
  readonly previewText: string;

  @ApiProperty({
    example: 12,
    description: 'Загальна кількість місць на курс',
  })
  @IsNumberString({}, {message: 'totalPlaces must be a number'}) // ... conforming to the specified constraints
  @IsNotEmpty()
  readonly totalPlaces: number;

  @ApiProperty({
    example: 5,
    description: '*Тривалість курсу (к-сть днів або годин)',
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

// //////////////////////////////////////////////////////////
  // ------------------------- details fields(3):

  @ApiProperty({
    example: 'Кожного дня нова тематика й практичне відпрацювання теорії в процесі приготування',
    description: 'Опис details_1: сериалізований об\'єкт з полями "name" та "description"',
  })
  @Matches(/^\s*\S/, { message: 'details_1 should not be empty' })
  readonly details_1: string;

  @ApiProperty({
    // example: 'Професійні зали обладнано потрібною технікою, а перед початком навчального дня на столах вже знаходяться потрібні продукти',
    description: 'Опис details_2: сериалізований об\'єкт з полями "name" та "description"',
  })
  @Matches(/^\s*\S/, { message: 'details_2 should not be empty' })
  readonly details_2: string;

  @ApiProperty({
    // example: 'Надруковані технічні карти, сертифікат про проходження курсу, обід, коробка для тістечок, які ви приготуєте.',
    description: 'Опис details_3: сериалізований об\'єкт з полями "name" та "description"',
  })
  @Matches(/^\s*\S/, { message: 'details_3 should not be empty' })
  readonly details_3: string;

  // ------------------------- program fields(3):
  @ApiProperty({
    // example: 'Надруковані технічні карти, сертифікат про проходження курсу, обід, коробка для тістечок, які ви приготуєте.',
    description: 'Опис program_1: сериалізований об\'єкт з полями "name" та "description"',
  })
  @Matches(/^\s*\S/, { message: 'program_1 should not be empty' })
  readonly program_1: string;

  @ApiProperty({
    // example: 'Надруковані технічні карти, сертифікат про проходження курсу, обід, коробка для тістечок, які ви приготуєте.',
    description: 'Опис program_2: сериалізований об\'єкт з полями "name" та "description"',
  })
  @Matches(/^\s*\S/, { message: 'program_2 should not be empty' })
  readonly program_2: string;

  @ApiProperty({
    // example: 'Надруковані технічні карти, сертифікат про проходження курсу, обід, коробка для тістечок, які ви приготуєте.',
    description: 'Опис program_3: сериалізований об\'єкт з полями "name" та "description"',
  })
  @Matches(/^\s*\S/, { message: 'program_3 should not be empty' })
  readonly program_3: string;
}
