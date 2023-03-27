import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Course } from 'src/db-schemas/course.schema';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { SearchCourseDto } from './dto/search-courses.dto';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @ApiOperation({ summary: 'Get array all Courses' })
  @ApiResponse({ status: 200, type: [Course] })
  @Get()
  getAllCourses() {
    return;
    // return this.coursesService.getAllCourses();
  }

  @ApiQuery({
    name: 'online',
    description: 'online values that need to be considered for filter',
  })
  @ApiOperation({ summary: 'Get array Courses online or offline' })
  @ApiResponse({ status: 200, type: [Course] })
  @Get()
  getCourses(@Query() dto: SearchCourseDto) {
  return 
    // return this.coursesService.getCoursesBy(dto);
  }


  @ApiOperation({ summary: 'Create course' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, type: Course, description: 'Course created' })
  @Post()
  CreateCourse(@Body() dto: CreateCourseDto) {
    return;
    // return this.coursesService.createCourse(dto);
  }

  // замінити картинки до курсу (1 або 2)
  // змінювати будь-яку інформацію про курс
  // видалити курс/м-клас
  
}
