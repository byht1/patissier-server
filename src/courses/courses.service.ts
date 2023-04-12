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

  async createCourse(dto: CreateCourseDto, { images }: UploadPictureDto) {
    try {

    const newImagesUrl = await this.firebaseStorage.uploadFileArray(images, EStireName.COURSES);
    const course = await this.courseModel.create({
      ...dto,
      images: newImagesUrl,
    });

    return course;
    } catch (error) {
      console.log("createCourse error: ", error)
    }
  }

  async deleteCourse(courseId: ObjectId): Promise<Course> {
    const course = await this.courseModel.findByIdAndRemove(courseId);
//  видалити картинки
    if(!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return course;
  }

  async addGroupToCourse(courseId: ObjectId, groupId: ObjectId) {
    const course = await this.courseModel.findById(courseId);

    if(!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND); 
    }

    course.groups.push(groupId);
    await course.save();

    return;
  }

  async deleteGroupFromCourse(courseId: ObjectId, groupId: ObjectId) {
    await this.courseModel.findByIdAndUpdate(courseId, {
      $pull: {groups: groupId}
    });

    return;
  }
}
