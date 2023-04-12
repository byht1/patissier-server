// Group is universal for both the course and the master class
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Course } from './course.schema';

// export interface ICourseDays {
//     start: string; // 07 грудня, 2022 // yyyy-mm-dd
//     end: string; // 11 грудня, 2022
// }
export interface ICourseDays {
    start: string; // 07 грудня, 2022 // yyyy-mm-dd
    end: string; // 11 грудня, 2022
}

export interface ICourseTime {
  from: string;
  to: string;
}

export type GroupDocument = Group & Document;

@Schema({ versionKey: false, timestamps: true })
export class Group {
    @ApiProperty({ example: '6373c0bca5a6e4c9556f1e7a' })
    _id: mongoose.Schema.Types.ObjectId;

    // type: string; // (online or offline), maybe another name
    type: "online" | "offline";

    @ApiProperty({ example: '6373c0bca5a6e4c9556f1e7a' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true })
    course: Course;

    @ApiProperty({ example: {
        start: '07.09.2023',
        end: '11.09.2023'
    }})
    @Prop({ type: {
        start: String,
        end: String
    }, required: true, _id: false })
    days: ICourseDays; // start, end

    @ApiProperty({ example: {
        from: '10:00',
        to: '14:00'
    }})
    @Prop({ type: {
        from: String,
        to: String
    }, required: true, _id: false })
    time: ICourseTime; // from, to

    @ApiProperty({example: 2000})
    @Prop({ type: Number, required: true })
    price: number;

    @ApiProperty({example: ['6373c0bca5a6e4c9556f1e7a']})
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    clientIds: [mongoose.Schema.Types.ObjectId];

    video: string; // url
}

export const GroupSchema = SchemaFactory.createForClass(Group);