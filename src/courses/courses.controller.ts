import { Controller, Post, Get, Query, Body, Param, Delete, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Course } from 'src/db-schemas/course.schema';
import { CoursesService } from './courses.service';
import { ObjectId } from 'mongoose';
import { CreateCourseDto, SearchCourseDto, UploadPictureDto } from './dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateGroupDto } from 'src/groups/dto';
import { GroupsService } from 'src/groups/groups.service';
import { Group } from 'src/db-schemas/group.schema';
import { GetAllCoursesSchema } from './schema-swagger/getAllCourses.schema';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService, 
    private groupService: GroupsService) {}

  // отримати усі курси
  @ApiOperation({ summary: 'Get all Courses online or offline' })
  @ApiResponse({ status: 200, description: 'Get all courses', type: [GetAllCoursesSchema]})
  @Get()
  getCourses(@Query() dto: SearchCourseDto) {
    return this.coursesService.getAllCourses();
  }

  // отримати курс по Id
  @ApiOperation({ summary: 'Get all Courses online or offline' })
  @ApiResponse({ status: 200, description: 'Get all courses', type: Course})
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Get(':courseId')
  getOneCourse(@Param('courseId') courseId: ObjectId) {
    return this.coursesService.getOneCourse(courseId);
  }

  // створити курс
  @ApiOperation({ summary: 'Create course' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, type: Course, description: 'Course created' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 2 }]))
  @Post()
  createCourse(@Body() dto: CreateCourseDto, @UploadedFiles() files: UploadPictureDto) {
    // console.log("files:", files)
    return this.coursesService.createCourse(dto, files);
    // return;
  }

  // видалити курс і усе, що з ним пов'язано
  @ApiOperation({ summary: 'Delete course' })
  @ApiResponse({ status: 200, description: 'Course deleted', type: Course })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Delete(':courseId')
  deleteCourse(@Param('courseId') courseId: ObjectId) {
    return this.coursesService.deleteCourse(courseId);
  }

  @ApiResponse({ status: 201, description: 'Group created', type: Group })
  @Post(':courseId/groups')
  addGroup(@Param('courseId') courseId: ObjectId, 
  @Body() groupDto: CreateGroupDto) {
    return this.groupService.createGroup(groupDto, courseId)
  }

  @Delete(':courseId/groups/:groupId')
  deleteGroup(@Param('courseId') courseId: ObjectId, 
  @Param('groupId') groupId: ObjectId) {
    return this.groupService.removeGroup(groupId, courseId)
  }

  // замінити картинки до курсу (1 або 2)
  // змінювати будь-яку інформацію про курс
  // видалити курс/м-клас
}
