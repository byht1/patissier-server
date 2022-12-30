import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
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
    example:
      'eyJhbGciOiJIUzI1NiI.eyJpZCI6IjYLCJpYXQiOjE2NjU2NTM2NgsImV4cCI6MTY2NTc0MDA3OH0.mZMKEw1j3N9VVZ97E',
  })
  @Prop()
  token: string[];

  @ApiProperty({
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @Prop({ type: String, default: null })
  verificationToken: string;

  @ApiProperty({
    example: false,
  })
  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  //   @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  //   @Prop({
  //     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
  //     default: [],
  //   })
  //   reviews: Reviews[];

  //   @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  //   @Prop({
  //     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Courses' }],
  //     default: [],
  //   })
  //   completedCourses: Courses[];

  //   @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  //   @Prop({
  //     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Courses' }],
  //     default: [],
  //   })
  //   reviews: Courses[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
