import { Course } from 'src/db-schemas/course.schema';
import { Review } from 'src/db-schemas/reviews.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { ObjectId } from 'mongoose';
import { Orders } from './orders.schema';
// import mongoose from 'mongoose';

export type UsersDocument = Users & Document;

@Schema({ versionKey: false, timestamps: true })
export class Users {
  @ApiProperty({ name: '_id', example: '6373c0bca5a6e4c9556f1e7a' })
  _id: ObjectId;

  @ApiProperty({ example: 'ByHt1' })
  @Prop({ type: String, required: true, unique: true })
  username: string;

  //   @ApiProperty({ example: 'Vitalik1_' })
  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @ApiProperty({ example: 'email' })
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiI.eyJpZCI6IjYLCJpYXQiOjE2NjU2NTM2NgsImV4cCI6MTY2NTc0MDA3OH0.mZMKEw1j3N9VVZ97E',
  })
  @Prop()
  token: string[];

  @ApiProperty({
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @Prop({ type: String, default: null })
  forgottenPasswordToken: string;

  @ApiProperty({
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @Prop({ type: String, default: null })
  verificationToken: string;

  @ApiProperty({
    example: false,
  })
  @Prop({ type: Boolean, default: false })
  verify: boolean;

  @ApiProperty({
    example: 'https://api.multiavatar.com/1.svg',
  })
  @Prop({ type: String, default: 'https://api.multiavatar.com/1.svg' })
  avatar_svg: string;

  @ApiProperty({
    example: 'https://api.multiavatar.com/1.png',
  })
  @Prop({ type: String, default: 'https://api.multiavatar.com/1.png' })
  avatar_png: string;

  @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    default: [],
  })
  reviews: Review[];

  @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    default: [],
  })
  completedCourses: Course[];

  @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Orders' }],
    default: [],
  })
  orders: Orders[];

  @ApiProperty({
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @Prop({ type: String, default: null })
  forgottenPassword: string;

  // @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  // @Prop({
  //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Courses' }],
  //   default: [],
  // })
  // reviews: Courses[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
