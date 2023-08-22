import { Type } from 'class-transformer';
import { IsObject, IsOptional, Matches, ValidateNested } from 'class-validator';

export class NameAndDescDto {
  @Matches(/^\s*\S/, { message: 'field must be a string' })
  @IsOptional()
  readonly name: string;

  @Matches(/^\s*\S/, { message: 'field must be a string' })
  @IsOptional()
  readonly description: string;
}

export class CourseDetailsDto {
  @Type(() => NameAndDescDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  readonly datails_1: NameAndDescDto;

  @Type(() => NameAndDescDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  readonly details_2: NameAndDescDto;

  @Type(() => NameAndDescDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  readonly details_3: NameAndDescDto;
}

export class CourseProgramDto {
  @Type(() => NameAndDescDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  readonly program_1: NameAndDescDto;

  @Type(() => NameAndDescDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  readonly program_2: NameAndDescDto;

  @Type(() => NameAndDescDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  readonly program_3: NameAndDescDto;
}
