import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cours, CoursDocument } from 'src/db-schemas/courses.schema';
import { CreateCoursDto } from './dto/create-cours.dto';
import { SearchCoursDto } from './dto/search-courses.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Cours.name) private coursModule: Model<CoursDocument>
  ) {}
  async getAllCourses() {
    const courses = await this.coursModule.find();
    return courses;
  }
  async getCourses(online: SearchCoursDto) {
    const courses = await this.coursModule.find({
      isOnline: online,
    });
    return courses;
  }
  async createCours(dto: CreateCoursDto) {
    const cours = await this.coursModule.create({
      ...dto,
      url: 'https://cdn.shopify.com/s/files/1/0603/8251/1357/files/001-Local-Pre-Orders-Big-Bear-Bakery_500x.jpg?v=1658394719',
    });
    return cours;
  }
}
