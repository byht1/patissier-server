// Group is universal for both the course and the master class
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Course } from './course.schema';

export enum EGroupFormat {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

export interface IStudyPeriod {
  startDate: string;
  endDate: string;
}

export interface IGroupScheduleTime {
  from: string;
  to: string;
}

export type GroupDocument = Group & Document;

@Schema({ versionKey: false, timestamps: true })
export class Group {
  @ApiProperty({ example: '6373c0bca5a6e4c9556f1e7a' })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, enum: Object.values(EGroupFormat), required: true })
  format: EGroupFormat;

  @ApiProperty({ example: '6373c0bca5a6e4c9556f1e7a' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true })
  courseId: Course;

  @ApiProperty({
    example: {
      startDate: '2023-09-09',
      endDate: '2023-09-18',
    },
  })
  @Prop({
    type: {
      startDate: String,
      endDate: String,
    },
    required: true,
    _id: false,
  })
  studyPeriod: IStudyPeriod;

  @ApiProperty({
    example: {
      from: '10:00',
      to: '14:00',
    },
  })
  @Prop({
    type: {
      from: String,
      to: String,
    },
    required: true,
    _id: false,
  })
  time: IGroupScheduleTime;

  @ApiProperty({ example: 2000 })
  @Prop({ type: Number, required: true })
  price: number;

  @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }] })
  clientIds: [mongoose.Schema.Types.ObjectId];

  video: string; // url
}

export const GroupSchema = SchemaFactory.createForClass(Group);
