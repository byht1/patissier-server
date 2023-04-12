import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/db-schemas/course.schema';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { FirebaseStorageManager } from 'src/firebase';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, FirebaseStorageManager, GroupsModule],
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    GroupsModule,
  ],
  exports: [CoursesService],
})
export class CoursesModule {}
