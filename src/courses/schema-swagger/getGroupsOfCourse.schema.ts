import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { EGroupFormat, IGroupScheduleTime, IStudyPeriod } from 'src/db-schemas/group.schema';

export class GetGroupsOfCourse {
  @ApiProperty({ example: '6373c0bca5a6e4c9556f1e7a' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'online' })
  format: EGroupFormat;

  @ApiProperty({ example: '6373c0bca5a6e4c9556f1e7a' })
  courseId: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    example: {
      startDate: '10 травня, субота',
      endDate: '16 травня, пʼятниця',
    },
  })
  studyPeriod: IStudyPeriod;

  @ApiProperty({
    example: {
      from: '10:00',
      to: '14:00',
    },
  })
  time: IGroupScheduleTime;

  @ApiProperty({ example: 2000 })
  price: number;

  @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  clientIds: [mongoose.Schema.Types.ObjectId];

  video: string; // url
}
