import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsEnum, IsNotEmpty, IsNumber, Matches, Validate, ValidateNested } from 'class-validator';
import { EndLaterThanStartRule } from 'src/classValidator/decorators/groupDateValidate';
import { EGroupFormat } from 'src/db-schemas/group.schema';

class StudyPeriodDto {
  @Matches(/^\s*\S/, { message: 'startDate must be a string' })
  @IsDefined()
  readonly startDate: string;

  @Matches(/^\s*\S/, { message: 'endDate must be a string' })
  @Validate(EndLaterThanStartRule)
  @IsDefined()
  readonly endDate: string;
}

class GroupScheduleTimeDto {
  @Matches(/^\s*\S/, { message: 'from must be a string' })
  @IsDefined()
  readonly from: string;

  @Matches(/^\s*\S/, { message: 'to must be a string' })
  @Validate(EndLaterThanStartRule)
  @IsDefined()
  readonly to: string;
}

export class CreateGroupDto {
  @ApiProperty({
    example: 'online',
    description: "Формат курсу: 'online' або 'offline'",
  })
  @IsEnum(EGroupFormat, { message: 'This format does not exist' })
  @Matches(/^\s*\S/, { message: 'format should not be empty' })
  readonly format: 'online' | 'offline';

  @ApiProperty({
    example: {
      startDate: '2023-09-09',
      endDate: '2023-09-18',
    },
    description: 'Дата початку й дата завершення у форматі YYYY-MM-DD',
  })
  @Type(() => StudyPeriodDto)
  @ValidateNested()
  @IsDefined()
  readonly studyPeriod: StudyPeriodDto;

  @ApiProperty({
    example: {
      from: '10:00',
      to: '14:00',
    },
    description: 'Час початку й час завершення у форматі HH:MM',
  })
  @Type(() => GroupScheduleTimeDto)
  @ValidateNested()
  @IsDefined()
  readonly time: GroupScheduleTimeDto;

  @ApiProperty({ example: 2000 })
  @IsNumber({}, { message: 'price must be a number' })
  @IsNotEmpty()
  readonly price: number;
}
