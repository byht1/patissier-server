import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Course, CourseDocument } from 'src/db-schemas/course.schema';
import { EStireName, FirebaseStorageManager } from 'src/firebase';
import { GroupsService } from 'src/groups/groups.service';
import { CreateCourseDto, SearchCoursesDto, UploadPictureDto } from './dto';
// import { SearchGroupsDto } from 'src/groups/dto';
import { filterCourses } from './helpers';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    private firebaseStorage: FirebaseStorageManager,
    private groupsService: GroupsService,
  ) {}

  async getAllCourses(dto: SearchCoursesDto) {
    const { type = null, count = 3, skip = 0 } = dto;
    const countLimit = count > 9 ? 9 : count;

    const filteredCourses = filterCourses(type);

    const courseList = this.courseModel
      .find(filteredCourses)
      .skip(skip)
      .limit(countLimit)
      .populate({
        path: 'groups',
        options: { sort: { 'days.start': -1 }, limit: 1 },
      });

    const totalCourses = this.courseModel.countDocuments(filteredCourses);

    const [totalHits, data] = await Promise.all([totalCourses, courseList]);

    return { totalHits, data };
  }

  // async getOneCourse(courseId: ObjectId, searchFormatDto: SearchGroupsDto) {
  async getOneCourse(courseId: ObjectId) {
    // const { format = 'online'} = searchFormatDto;
    // const course = await this.courseModel.findById(courseId).populate('groups');
    const currentDate = new Date().toISOString().slice(0, 10);

    const course = await this.courseModel.findById(courseId).populate({
      path: 'groups',
      match: {
        'studyPeriod.startDate': { $gte: currentDate },
      },
      options: { sort: { 'studyPeriod.startDate': -1 } },
      // match: {format: format},
      // options: {limit: 1, select: '-createdAt -updatedAt'},
    });

    if (!course) {
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
      console.log('createCourse error: ', error);
    }
  }

  async deleteCourse(courseId: ObjectId): Promise<Course> {
    const course = await this.courseModel.findByIdAndRemove(courseId);

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    const deleteGroupsPromise = this.groupsService.removeAllCourseGroups(courseId);
    const deleteImagesPromise = course.images.map(image => this.firebaseStorage.deleteFile(image));

    await Promise.all([deleteGroupsPromise, deleteImagesPromise]);

    return course;
  }

  async addGroupToCourse(courseId: ObjectId, groupId: ObjectId) {
    const course = await this.courseModel.findById(courseId);

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    course.groups.push(groupId);
    await course.save();

    return;
  }

  async deleteGroupFromCourse(courseId: ObjectId, groupId: ObjectId) {
    await this.courseModel.findByIdAndUpdate(courseId, {
      $pull: { groups: groupId },
    });

    return;
  }
}
