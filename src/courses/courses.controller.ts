import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Course } from 'src/db-schemas/courses.schema';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { SearchCourseDto } from './dto/search-courses.dto';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @ApiOperation({ summary: 'Get array all Courses' })
  @ApiResponse({ status: 200, type: [Course] })
  @Get('/all')
  getAllCourses() {
    return this.coursesService.getAllCourses();
  }
  @ApiQuery({
    name: 'online',
    description: 'online values that need to be considered for filter',
  })
  @ApiOperation({ summary: 'Get array Courses online or offline' })
  @ApiResponse({ status: 200, type: [Course] })
  @Get()
  getCourses(@Query('online') online: SearchCourseDto) {
    return this.coursesService.getCourses(online);
  }
  @ApiOperation({ summary: 'Create Course' })
  @ApiResponse({ status: 200, type: [Course] })
  @Post()
  CreateCourse(@Body() dto: CreateCourseDto) {
    return this.coursesService.createCourse(dto);
  }
}
