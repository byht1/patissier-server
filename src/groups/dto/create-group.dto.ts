import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { ICourseDays, ICourseTime } from "src/db-schemas/group.schema";

//  * - поміняти опис

export class CreateGroupDto {
    @ApiProperty({
        example: "online",
        description: 'Формат курсу', 
    })
    readonly type: "online" | "offline";

    @ApiProperty({
        example: {
            start: '2023-09-09',
            end: '2023-09-18'
        },
        description: '*Дні',
    })
    readonly days: ICourseDays;

    @ApiProperty({
        example: {
            from: '10:00',
            to: '14:00'
        },
        description: '*Час',
    })
    readonly time: ICourseTime;

    @ApiProperty({example: 2000})
    readonly price: number;

    @ApiProperty({example: ['6373c0bca5a6e4c9556f1e7a']})
    readonly clientsIds: ObjectId[];
}
