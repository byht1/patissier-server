import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Course, CourseDocument } from 'src/db-schemas/course.schema';
import { EStireName, FirebaseStorageManager } from 'src/firebase';
import { GroupsService } from 'src/groups/groups.service';
import { CreateCourseDto, SearchCourseGroupsDto, SearchCoursesDto, UpdateCourseDto, UploadPictureDto } from './dto';
import { filterCourses } from './helpers';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    private firebaseStorage: FirebaseStorageManager,
    private groupsService: GroupsService,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto, { images }: UploadPictureDto) {
    try {
      const newImagesUrl = await this.firebaseStorage.uploadFileArray(images, EStireName.COURSES);
      const course = await this.courseModel.create({
        ...createCourseDto,
        images: newImagesUrl,
      });

      return course;
    } catch (error) {
      console.log('createCourse error: ', error);
    }
  }

  async getAllCourses(searchCOursesDto: SearchCoursesDto) {
    const { type = null, limit = 3, skip = 0 } = searchCOursesDto;
    const countLimit = limit > 9 ? 9 : limit;

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

    return { totalHits, data, limit: +countLimit };
  }

  async getOneCourse(courseId: ObjectId, searchGroupsDto: SearchCourseGroupsDto) {
    const { format, limit = 16, skip = 0 } = searchGroupsDto;
    const countLimit = limit > 16 ? 16 : limit;

    const currentDate = new Date().toISOString().slice(0, 10);

    const coursePopulated = await this.courseModel.findById(courseId).populate({
      path: 'groups',
      match: {
        ...(format && { format }),
        'studyPeriod.startDate': { $gte: currentDate },
      },
      options: { sort: { 'studyPeriod.startDate': -1 }, limit: countLimit, skip },
    });

    const fullCourse = await this.courseModel.findById(courseId);
    const groupCount = fullCourse.groups.length;

    const [course, totalGroups] = await Promise.all([coursePopulated, groupCount]);

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return { course, totalGroups, groupLimit: +countLimit };
  }

  async updateCourse(updateCourseDto: UpdateCourseDto, courseId: ObjectId) {
    const { type, category, previewText, totalPlaces, courseDuration, description, details, program } = updateCourseDto;
    const courseFind = await this.courseModel.findById(courseId);
    if (!courseFind) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
    const updateObject = {
      ...(type && { type }),
      ...(category && { category }),
      ...(previewText && { previewText }),
      ...(totalPlaces && { totalPlaces }),
      ...(courseDuration && { courseDuration }),
      ...(description && { description }),

      'details.details_1.name': details?.details_1?.name,
      'details.details_1.description': details?.details_1?.description,
      'details.details_2.name': details?.details_2?.name,
      'details.details_2.description': details?.details_2?.description,
      'details.details_3.name': details?.details_3?.name,
      'details.details_3.description': details?.details_3?.description,
      //
      'program.program_1.name': program?.program_1?.name,
      'program.program_1.description': program?.program_1?.description,
      'program.program_2.name': program?.program_2?.name,
      'program.program_2.description': program?.program_2?.description,
      'program.program_3.name': program?.program_3?.name,
      'program.program_3.description': program?.program_3?.description,
    };

    const courseUpdated = await this.courseModel.findByIdAndUpdate(courseId, updateObject, { new: true });
    return courseUpdated;
    // return 'my return';
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
