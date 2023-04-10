import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Course, CourseDocument } from 'src/db-schemas/course.schema';
import { EStireName, FirebaseStorageManager } from 'src/firebase';
import { CreateCourseDto, UploadPictureDto } from './dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    private firebaseStorage: FirebaseStorageManager,
  ) {}

  async getAllCourses() {
    const courseList = this.courseModel
      .find()
      .sort({'createdAt': -1})
    
    const totalCourses = this.courseModel.countDocuments();

    const [total, courses] = await Promise.all([totalCourses, courseList])
    // console.log("res:", total, "/", courses)
      
    return { total, courses };
  }

  async getOneCourse(courseId) {
    const course = await this.courseModel.findById(courseId);

    if(!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return course;
  }

  async createCourse(dto: CreateCourseDto, { picture }: UploadPictureDto): Promise<Course> {
    const pictureUrlPromise = await this.firebaseStorage.uploadFileArray(picture, EStireName.COURSES);
    const course = await this.courseModel.create({
      ...dto,
      picture: pictureUrlPromise,
    });

    return course;
  }

  async deleteCourse(courseId: ObjectId): Promise<Course> {
    const course = await this.courseModel.findByIdAndRemove(courseId);
//  видалити картинки
    if(!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return course;
  }

  // async addGroupToCourse() {}

  // async deleteGroupFromCourse() {}
}
