import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsJSON, IsNotEmpty, IsNumberString, IsString, Matches } from 'class-validator';
import { errorMessageDto } from 'src/classValidator';
import { ECourseType } from 'src/db-schemas/course.schema';
import { fieldsValid } from '../helpers';
// import { ValidateSerializedObject } from 'src/classValidator/decorators/coursesSerializedObjValidate';
// * - можливо поміняти description

export class CreateCourseDto {
  @ApiProperty({
    example: 'courses',
    description: 'Тип: "courses" або "master_classes"',
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
    example: 'На курсі ви навчитеся ...',
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
  @IsNumberString({}, { message: 'courseDuration must be a number' })
  @IsNotEmpty()
  readonly courseDuration: number;

  @ApiProperty({
    example: 'Програма навчання розрахована як для кондитерів-початківців...',
    description: 'Повний детальний опис курсу даної категорії',
  })
  @Matches(/^\s*\S/, { message: 'description should not be empty' })
  readonly description: string;

  @ApiProperty({
    example: 'details: {details_1: {name, description}, details_2: {name, description}, details_3: {name, description}}',
    description: 'Сериалізований об\'єкт з трьома полями: details_1, details_2, details_3. Кожне має обов\'язкові поля "name" та "description"',
  })
  // @ValidateSerializedObject()
  @IsJSON()
  readonly details: string;

  @ApiProperty({
    example: 'program: {program_1: {name, description}, program_2: {name, description}, program_3: {name, description}}',
    description: 'Сериалізований об\'єкт з трьома полями: program_1, program_2, program_3. Кожне має обов\'язкові поля "name" та "description"',
  })
  // @ValidateSerializedObject()
  @IsJSON()
  readonly program: string;
}
