import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateGroupDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from 'src/db-schemas/group.schema';
import { Model, ObjectId } from 'mongoose';
import { CoursesService } from 'src/courses/courses.service';
import { SearchCourseGroupsDto } from 'src/courses/dto';
import { formatStudyPeriod } from 'src/courses/helpers';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    @Inject(forwardRef(() => CoursesService))
    private coursesService: CoursesService,
  ) {}
  // створити групу
  async createGroup(createGroupDto: CreateGroupDto, courseId: ObjectId): Promise<Group> {
    const group = await this.groupModel.create({
      ...createGroupDto,
      courseId,
    });

    await this.coursesService.addGroupToCourse(courseId, group._id);

    return group;
  }

  async getCourseGroups(courseId: ObjectId, searchGroupsDto: SearchCourseGroupsDto): Promise<Group[]> {
    const { format = null } = searchGroupsDto;

    const currentDate = new Date().toISOString().slice(0, 10);

    const groups = await this.groupModel
      .find({
        courseId: courseId,
        'studyPeriod.startDate': { $gte: currentDate },
        ...(format && { format }),
      })
      .limit(16)
      .sort({ 'studyPeriod.startDate': 1 })
      .lean();

    if (!groups) {
      throw new HttpException('Groups not found', HttpStatus.NOT_FOUND);
    }

    const groupsWithFormattedDates = groups.map(group => ({
      ...group,
      studyPeriod: {
        startDate: formatStudyPeriod(group.studyPeriod.startDate),
        endDate: formatStudyPeriod(group.studyPeriod.endDate),
      },
    }));

    return groupsWithFormattedDates as GroupDocument[];
  }

  // змінити будь-яке поле (час на усі дні однаковий)
  // update(id: number, updateGroupDto: UpdateGroupDto) {
  //   return `This action updates a #${id} group`;
  // }

  // видалити групу
  async removeGroup(groupId: ObjectId, courseId: ObjectId): Promise<Group> {
    const groupFind = await this.groupModel.findOneAndRemove({ course: courseId, _id: groupId });

    if (!groupFind) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    await this.coursesService.deleteGroupFromCourse(courseId, groupId);

    return groupFind;
  }

  async removeAllCourseGroups(courseId: ObjectId) {
    await this.groupModel.deleteMany({ courseId: courseId });
    return;
  }
}
