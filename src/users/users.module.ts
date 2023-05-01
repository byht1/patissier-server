import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/db-schemas/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { UserFavoriteService } from './services/user-favorite.service';
import { UserBasketService } from './services/user-basket.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }])],
  controllers: [UsersController],
  providers: [UsersService, UserFavoriteService, UserBasketService],
  exports: [UsersService],
})
export class UsersModule {}
