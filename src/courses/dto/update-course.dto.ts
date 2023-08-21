import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { errorMessageDto } from 'src/classValidator';
import {
  ECourseType,
  ICourseDetails,
  ICourseProgram,
  courseDurationAvailableWords,
} from 'src/db-schemas/course.schema';
import { fieldsValid } from '../helpers';
import { Type } from 'class-transformer';
import { CourseDetailsDto, CourseProgramDto } from './details-and-program.dto';

export class UpdateCourseDto {
  @ApiProperty({
    example: 'courses',
    description: 'Тип: "courses" або "master_classes"',
    required: false,
  })
  @IsEnum(ECourseType, { message: 'This type does not exist' })
  @Matches(/^\s*\S/, { message: 'type should not be empty' })
  @IsOptional()
  readonly type: ECourseType;

  @ApiProperty({
    example: 'Торти',
    description: 'Категорія курсу',
    required: false,
  })
  @Matches(fieldsValid.allowedCharacters.value, { message: fieldsValid.allowedCharacters.message })
  @Matches(/^\s*\S/, { message: 'category should not be empty' })
  @IsString({ message: errorMessageDto.notString })
  @IsOptional()
  readonly category: string;

  @ApiProperty({
    example: 'На курсі ви навчитеся ...',
    description: "Короткий текст-прев'ю",
    required: false,
  })
  @Matches(/^\s*\S/, { message: 'previewText should not be empty' })
  @IsOptional()
  readonly previewText: string;

  @ApiProperty({
    example: 12,
    description: 'Загальна кількість місць на курс',
    required: false,
  })
  @IsNumberString({}, { message: 'totalPlaces must be a number' })
  @IsNotEmpty()
  @IsOptional()
  readonly totalPlaces: number;

  @ApiProperty({
    example: '5 днів',
    description: 'Тривалість курсу: к-сть днів або годин',
    required: false,
  })
  @IsString()
  @Matches(/(\d+)\s*(дні|днів|години|годин)/, {
    message: `courseDuration must include a number and one of the words: ${courseDurationAvailableWords.join(', ')}`,
  })
  @IsString()
  readonly courseDuration: string;

  @ApiProperty({
    example: 'Програма навчання розрахована як для кондитерів-початківців...',
    description: 'Повний детальний опис курсу даної категорії',
    required: false,
  })
  @Matches(/^\s*\S/, { message: 'description should not be empty' })
  @IsOptional()
  readonly description: string;

  @ApiProperty({
    example: {
      details_1: {
        name: '5 днів практики',
        description: 'Кожного дня нова тематика й практичне відпрацювання теорії  в процесі приготування',
      },
    },
    description:
      "Деталі навчання. Можна змінювати інформацію в полях 'name' й 'description' будь-якого з об'єктів: details_1, details_2, details_3",
    required: false,
  })
  @Type(() => CourseDetailsDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  readonly details: ICourseDetails;

  @ApiProperty({
    example: {
      program_1: {
        name: 'Теорія',
        description: 'Класичний рецепт випічки та глінтвейну',
      },
    },
    description:
      "Програма навчання. Можна змінювати інформацію в полях 'name' й 'description' будь-якого з об'єктів: program_1, program_2, program_3",
    required: false,
  })
  @Type(() => CourseProgramDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  readonly program: ICourseProgram;
}
