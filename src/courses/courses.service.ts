import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Course, CourseDocument } from 'src/db-schemas/course.schema';
import { EStireName, FirebaseStorageManager } from 'src/firebase';
import { CreateCourseDto, SearchDto, UploadPictureDto } from './dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    private firebaseStorage: FirebaseStorageManager,
  ) {}

  async getAllCourses(dto: SearchDto) {
    const { type = null, count = 3, offset = 0 } = dto;
    const filteredCourses = (type: string) => {
      switch (type) {
        case null:
          return null;
          // break;
        case "Курс":
          console.log(2)
          return { type: "Курс" };
          // break;
        case "Майстер-клас":
          console.log(3)
          return { type: "Майстер-клас" }; // master-class
          // break;
        default:
          return;
      }
    }
    console.log("my sign")

    const courseList = this.courseModel
      .find(filteredCourses(type))
      .skip(offset)
      .limit(count)
      .populate({
        path: 'groups',
        options: { sort: { 'days.start': -1 }, limit: 1 }
      })
    
    const totalCourses = this.courseModel.countDocuments(filteredCourses(type));

    const [total, data] = await Promise.all([totalCourses, courseList])
      
    return { total, data };
  }

  async getOneCourse(courseId: ObjectId) {
    const course = await this.courseModel.findById(courseId).populate('groups');

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

    if(!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    const deleteImagesPromise = course.images.map(image => this.firebaseStorage.deleteFile(image))
    await Promise.all(deleteImagesPromise)

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
