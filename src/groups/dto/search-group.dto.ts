import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { ECourseFormat } from "src/db-schemas/group.schema";

export class SearchGroupsDto {
    @ApiProperty({
        example: 'online',
        description: 'Формат курсу: \'oline\' або \'offline\'',
        required: false,
    })
    @IsEnum(ECourseFormat, { message: 'This \'format\' query parameter value does not exist' })
    //The format of this query parameter is invalid
    @IsOptional()
    readonly format?: ECourseFormat;
}