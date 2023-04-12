import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto, UpdateGroupDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from 'src/db-schemas/group.schema';
import { Model, ObjectId } from 'mongoose';
import { CoursesService } from 'src/courses/courses.service';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    private coursesService: CoursesService) {}
    // створити групу
  async createGroup(createGroupDto: CreateGroupDto, courseId: ObjectId): Promise<Group> {
    const group = await this.groupModel.create({
      ...createGroupDto,
      course: courseId,
    })

    await this.coursesService.addGroupToCourse(courseId, group._id)

    return group;
  }

  // змінити будь-яке поле (час на усі дні однаковий)
  // update(id: number, updateGroupDto: UpdateGroupDto) {
  //   return `This action updates a #${id} group`;
  // }

  // видалити групу
  async removeGroup(groupId: ObjectId, courseId: ObjectId) {
    const groupFind = await this.groupModel.findOneAndRemove({ course: courseId, _id: groupId });

    if(!groupFind) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }

    await this.coursesService.deleteGroupFromCourse(courseId, groupId);

    return groupFind;
  }
}
