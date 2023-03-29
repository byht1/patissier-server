import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Users, UsersDocument } from 'src/db-schemas/users.schema';

@Injectable()
export class UserFavoriteService {
  constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>) {}

  async addToFavorites(userId: ObjectId, productId: ObjectId) {
    const user = await this.usersModel
      .findByIdAndUpdate(userId, { $addToSet: { favorites: productId } }, { new: true })
      .select({ favorites: 1 });
    return user.favorites;
  }

  async deleteToFavorite(userId: ObjectId, productId: ObjectId) {
    const user = await this.usersModel
      .findByIdAndUpdate(userId, { $pull: { favorites: productId } }, { new: true })
      .select({ favorites: 1 });
    return user.favorites;
  }
}
