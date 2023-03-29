import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/db-schemas/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { UserAndStoreService } from './services/user-and-store.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }])],
  controllers: [UsersController],
  providers: [UsersService, UserAndStoreService],
  exports: [UsersService],
})
export class UsersModule {}
