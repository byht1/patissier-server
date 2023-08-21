import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, Matches } from "class-validator";
import { EGroupFormat } from "src/db-schemas/group.schema";

export class SearchGroupsDto {
  @ApiProperty({
    example: 'online',
    description: "'type' може мати тільки одне із двох значень: 'courses' або 'master_classes'",
    required: false,
  })
  @IsEnum(EGroupFormat, { message: "This query 'format' does not exist" })
  @Matches(/^\s*\S/, { message: 'type should not be empty' })
  @IsOptional()
  readonly format?: EGroupFormat;
}