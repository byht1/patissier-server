import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cours } from 'src/db-schemas/courses.schema';
import { CoursesService } from './courses.service';
import { CreateCoursDto } from './dto/create-cours.dto';
import { SearchCoursDto } from './dto/search-courses.dto';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @ApiOperation({ summary: 'Get array all Courses' })
  @ApiResponse({ status: 200, type: [Cours] })
  @Get()
  getAllCourses() {
    return this.coursesService.getAllCourses();
  }
  @ApiQuery({
    name: 'online',
    description: 'online values that need to be considered for filter',
  })
  @ApiOperation({ summary: 'Get array Courses online or offline' })
  @ApiResponse({ status: 200, type: [Cours] })
  @Get()
  getCourses(@Query('online') online: SearchCoursDto) {
    return this.coursesService.getCourses(online);
  }
  @ApiOperation({ summary: 'Create Cours' })
  @ApiResponse({ status: 200, type: [Cours] })
  @Post()
  CreateCours(@Body() dto: CreateCoursDto) {
    return this.coursesService.createCours(dto);
  }
}
