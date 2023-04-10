import { Controller, Post, Get, Query, Body, Param, Delete, UploadedFiles } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Course } from 'src/db-schemas/course.schema';
import { CoursesService } from './courses.service';
import { ObjectId } from 'mongoose';
import { CreateCourseDto, SearchCourseDto, UploadPictureDto } from './dto';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  // отримати усі курси
  @ApiOperation({ summary: 'Get all Courses online or offline' })
  @ApiResponse({ status: 200, description: 'Get all courses', type: [Course]})
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
  @ApiResponse({ status: 200, type: Course, description: 'Course created' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Post()
  createCourse(@Body() dto: CreateCourseDto, @UploadedFiles() file: UploadPictureDto) {
    return this.coursesService.createCourse(dto, file);
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

  // замінити картинки до курсу (1 або 2)
  // змінювати будь-яку інформацію про курс
  // видалити курс/м-клас
}
