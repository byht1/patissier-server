import { Module, forwardRef } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CoursesModule } from 'src/courses/courses.module';
import { Group, GroupSchema } from 'src/db-schemas/group.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [GroupsService],
  exports: [GroupsService],
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]), 
    forwardRef(() => CoursesModule),
  ],
})
export class GroupsModule {}
