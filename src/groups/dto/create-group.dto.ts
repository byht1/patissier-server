import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsNumberString, Matches } from "class-validator";
import { ObjectId } from "mongoose";
import { ECourseFormat, ICourseDays, ICourseTime } from "src/db-schemas/group.schema";

//  * - поміняти опис

export class CreateGroupDto {
    @ApiProperty({
        example: "online",
        description: 'Формат курсу: \'oline\' або \'offline\'', 
    })
    @IsEnum(ECourseFormat, { message: 'This format does not exist' })
    @Matches(/^\s*\S/, { message: 'format should not be empty' })
    readonly format: "online" | "offline";

    @ApiProperty({
        example: {
            start: '2023-09-09',
            end: '2023-09-18'
        },
        description: '*Дні у форматі yyyy-mm-dd', //
    })
    readonly days: ICourseDays; // перевірка на відповідність к-сті днів відповідно до курсу

    @ApiProperty({
        example: {
            from: '10:00',
            to: '14:00'
        },
        description: '*Час у форматі hh:mm', //
    })
    readonly time: ICourseTime; // перевірка

    @ApiProperty({ example: 2000 })
    @IsNumber({}, {message: 'price must be a number'})
    @IsNotEmpty()
    readonly price: number;

    @ApiProperty({example: ['6373c0bca5a6e4c9556f1e7a']})
    readonly clientsIds: ObjectId[];
}
