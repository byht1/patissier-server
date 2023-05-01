import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Users, UsersDocument } from 'src/db-schemas/users.schema';

@Injectable()
export class UserBasketService {
  private skipFields = { similar_products: 0, likes: 0, orders: 0 };
  constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>) {}

  async addToBasket(userId: ObjectId, productId: ObjectId, select: Record<string, number>) {
    const selectValueExists = this.checkSelectValueNotEmpty(select);
    const user = await this.usersModel
      .findByIdAndUpdate(userId, { $addToSet: { basket: productId } }, { new: true })
      .select({ basket: 1 })
      .populate('basket', selectValueExists);
    return user.basket;
  }

  async deleteToBasket(userId: ObjectId, productId: ObjectId, select: Record<string, number>) {
    const selectValueExists = this.checkSelectValueNotEmpty(select);
    const user = await this.usersModel
      .findByIdAndUpdate(userId, { $pull: { basket: productId } }, { new: true })
      .select({ basket: 1 })
      .populate('basket', selectValueExists);
    return user.basket;
  }

  async userBasket(userId: ObjectId, select: Record<string, number>) {
    const selectValueExists = this.checkSelectValueNotEmpty(select);
    const user = await this.usersModel.findById(userId).select({ basket: 1 }).populate('basket', selectValueExists);
    return user.basket;
  }

  private checkSelectValueNotEmpty(select: Record<string, number>) {
    const isValue = Object.keys(select);

    return isValue.length ? select : this.skipFields;
  }
}
