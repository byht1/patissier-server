import { ObjectId } from "mongoose";
import { ICourseDays, ICourseTime } from "src/db-schemas/group.schema";

export class CreateGroupDto {
    readonly type: "online" | "offline";

    readonly days: ICourseDays;

    readonly time: ICourseTime;

    readonly price: number;

    readonly clientsIds: ObjectId[];
}
