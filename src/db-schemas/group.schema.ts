// Group is universal for both the course and the master class
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Course } from './course.schema';

export interface ICourseDays {
    startDate: string; // 07 грудня, 2022
    endDate: string; // 11 грудня, 2022
}

export interface ICourseTime {
    from: string; // 10:00
    to: string; // 14:00
}

export type GroupDocument = Group & Document;

@Schema({ versionKey: false, timestamps: true })
export class Group {
    @ApiProperty({ example: '6373c0bca5a6e4c9556f1e7a' })
    _id: mongoose.Schema.Types.ObjectId;

    // type: string; // (online or offline), maybe another name
    type: "online" | "offline";

    @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true })
    course: Course;

    @ApiProperty({ example: {
        startDate: '07.09.2023',
        endDate: '11.09.2023'
    } })
    days: ICourseDays; // start, end

    @ApiProperty({ example: {
        startDate: '10:00',
        endDate: '14:00'
    }})
    time: ICourseTime; // from, to

    @ApiProperty({example: 2000})
    @Prop({ type: Number, required: true })
    price: number;

    @ApiProperty({example: ['6373c0bca5a6e4c9556f1e7a']})
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    clientIds: [mongoose.Schema.Types.ObjectId];

    video: string; // url
}

export const GroupSchema = SchemaFactory.createForClass(Group);