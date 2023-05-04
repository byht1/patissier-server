import { IsObject, IsOptional, IsString, Matches } from 'class-validator';

export class NameAndDescDto {
  @Matches(/^\s*\S/, { message: 'field must be a string' })
  @IsOptional()
  readonly name: string;

  @Matches(/^\s*\S/, { message: 'field must be a string' })
  @IsOptional()
  readonly description: string;
}

export class CourseDetailsDto {
  @IsObject()
  @IsOptional()
  readonly datails_1: NameAndDescDto;

  @IsObject()
  @IsOptional()
  readonly details_2: NameAndDescDto;

  @IsObject()
  @IsOptional()
  readonly details_3: NameAndDescDto;
}

export class CourseProgramDto {
  @IsObject()
  @IsOptional()
  readonly program_1: NameAndDescDto;

  @IsObject()
  @IsOptional()
  readonly program_2: NameAndDescDto;

  @IsObject()
  @IsOptional()
  readonly program_3: NameAndDescDto;
}
