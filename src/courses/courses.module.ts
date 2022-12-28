import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cours, CoursSchema } from 'src/db-schemas/courses.schema';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports: [
    MongooseModule.forFeature([{ name: Cours.name, schema: CoursSchema }]),
  ],
})
export class CoursesModule {}
