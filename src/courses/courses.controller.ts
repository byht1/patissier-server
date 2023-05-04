import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Course } from 'src/db-schemas/course.schema';
import { CoursesService } from './courses.service';
import { ObjectId } from 'mongoose';
import { CreateCourseDto, SearchCoursesDto, UpdateCourseDto, UploadPictureDto } from './dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateGroupDto } from 'src/groups/dto';
import { GroupsService } from 'src/groups/groups.service';
import { Group } from 'src/db-schemas/group.schema';
import { GetAllCoursesSchema } from './schema-swagger/getAllCourses.schema';
import { ValidateIsNotVoid, ValidatePipe } from 'src/classValidator';
import { CourseValidationPipe } from 'src/classValidator/pipe/courses.pipe';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService, private groupService: GroupsService) {}
  // створити курс
  @ApiOperation({ summary: 'Create course' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, type: Course, description: 'Course created' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @UsePipes(ValidateIsNotVoid)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 2 }]))
  @Post()
  createCourse(@Body(CourseValidationPipe) dto: CreateCourseDto, @UploadedFiles() files: UploadPictureDto) {
    return this.coursesService.createCourse(dto, files);
    // return;
  }
  // отримати усі курси
  @ApiOperation({ summary: 'Get Course List' })
  @ApiResponse({ status: 200, description: 'Get course list', type: GetAllCoursesSchema })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @Get()
  getCourses(@Query() searchDto: SearchCoursesDto) {
    return this.coursesService.getAllCourses(searchDto);
  }

  // отримати курс по Id
  @ApiOperation({ summary: 'Get all Courses online or offline' })
  @ApiResponse({ status: 200, description: 'Get all courses', type: Course })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @Get(':courseId')
  getOneCourse(@Param('courseId') courseId: ObjectId) {
    return this.coursesService.getOneCourse(courseId);
  }
  // update course
  @ApiOperation({ summary: 'Update course' })
  @ApiResponse({ status: 200, type: Course, description: 'Course updated' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 500, description: 'Server error' })
  // @UsePipes(ValidatePipe)
  // @UsePipes(ValidationPipe)
  @UsePipes(ValidateIsNotVoid)
  @Patch(':courseId')
  updateCourse(@Param('courseId') courseId: ObjectId, @Body(ValidationPipe) updateCourseDto: UpdateCourseDto) {
    return this.coursesService.updateCourse(updateCourseDto, courseId);
  }

  // видалити курс і усе, що з ним пов'язано
  @ApiOperation({ summary: 'Delete course' })
  @ApiResponse({ status: 200, description: 'Course deleted', type: Course })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Delete(':courseId')
  deleteCourse(@Param('courseId') courseId: ObjectId) {
    // const courseDelete = this.coursesService.deleteCourse(courseId);
    // this.groupService.removeAllCourseGroups(courseId);
    // return courseDelete;
    return this.coursesService.deleteCourse(courseId);
  }

  // створити групу до курсу
  // @ApiOperation({ summary: 'Add group(s) to a course' })
  @ApiResponse({ status: 201, description: 'Group created', type: Group })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidationPipe)
  @UsePipes(ValidateIsNotVoid)
  @Post(':courseId/groups')
  addGroup(@Param('courseId') courseId: ObjectId, @Body() groupDto: CreateGroupDto) {
    return this.groupService.createGroup(groupDto, courseId);
  }

  // видалити групу з курсу
  @ApiOperation({ summary: 'Delete a group from a course' })
  @ApiResponse({ status: 200, description: 'Group deleted', type: Group })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Delete(':courseId/groups/:groupId')
  deleteGroup(@Param('courseId') courseId: ObjectId, @Param('groupId') groupId: ObjectId) {
    return this.groupService.removeGroup(groupId, courseId);
  }

  // замінити картинки до курсу (1 або 2)
  // змінювати будь-яку інформацію про курс
}
