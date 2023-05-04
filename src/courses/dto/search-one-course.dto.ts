import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { EGroupFormat } from 'src/db-schemas/group.schema';

export class SearchCourseGroupsDto {
  @ApiProperty({
    example: 'online',
    description: "Формат курсу: 'oline' або 'offline'",
    required: false,
  })
  @IsEnum(EGroupFormat, { message: "This 'format' query parameter value does not exist" })
  @IsOptional()
  readonly format?: EGroupFormat;

  @ApiProperty({
    example: '16',
    description: 'Максимальна кількість груп, які повертаються в курсі за один запит (16 за замовчуванням)',
    required: false,
  })
  @IsNumberString({}, { message: 'limit must be a number' })
  @IsOptional()
  readonly limit?: number;

  @ApiProperty({
    example: '0',
    description: 'Кількість пропущених груп за запитом',
    required: false,
  })
  @IsNumberString({}, { message: 'skip must be a number' })
  @IsOptional()
  readonly skip?: number;
}
