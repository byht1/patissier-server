import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNotEmpty, IsNumber, Matches } from 'class-validator';
import { EGroupFormat, IStudyPeriod, IGroupScheduleTime } from 'src/db-schemas/group.schema';

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
  @IsDefined()
  readonly studyPeriod: IStudyPeriod;

  @ApiProperty({
    example: {
      from: '10:00',
      to: '14:00',
    },
    description: 'Час початку й час завершення у форматі HH:MM',
  })
  @IsDefined()
  readonly time: IGroupScheduleTime;

  @ApiProperty({ example: 2000 })
  @IsNumber({}, { message: 'price must be a number' })
  @IsNotEmpty()
  readonly price: number;
}
