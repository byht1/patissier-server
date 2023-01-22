import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from 'src/db-schemas/courses.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { SearchCourseDto } from './dto/search-courses.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModule: Model<CourseDocument>,
  ) {}
  async getAllCourses() {
    const courses = await this.courseModule
      .find()
      .gt('startDate', new Date().getTime())
      .sort('startDate');
    return courses;
  }
  async getCoursesBy(dto: SearchCourseDto) {
    const find =
      dto.category === 'all'
        ? {
            isOnline: dto.online,
          }
        : {
            isOnline: dto.online,
            category: { $regex: dto.category, $options: 'i' },
          };

    const courses = await this.courseModule.find(find);
    return courses;
  }

  async createCourse(dto: CreateCourseDto) {
    const { startDate } = dto;
    const course = await this.courseModule.create({
      ...dto,
      startDate: new Date(startDate).getTime(),
      url: 'https://cdn.shopify.com/s/files/1/0603/8251/1357/files/001-Local-Pre-Orders-Big-Bear-Bakery_500x.jpg?v=1658394719',
    });
    return course;
  }
}
