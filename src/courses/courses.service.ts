import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from 'src/db-schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
// import { SearchCourseDto } from './dto/search-courses.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}
  // async getAllCourses() {
  //   const courses = await this.courseModel
  //     .find()
  //     .gt('startDate', new Date().getTime())
  //     .sort('startDate');
  //   return courses;
  // }
  // async getCoursesBy(dto: SearchCourseDto) {
  //   const find =
  //     dto.category === 'all'
  //       ? {
  //           isOnline: dto.online,
  //         }
  //       : {
  //           isOnline: dto.online,
  //           category: { $regex: dto.category, $options: 'i' },
  //         };

  //   const courses = await this.courseModel.find(find);
  //   return courses;
  // }

  async createCourse(dto: CreateCourseDto, image: UploadeFileDto) {
    // const { startDate } = dto;
    const course = await this.courseModel.create({
      ...dto,
    });
    return course;
  }
}
