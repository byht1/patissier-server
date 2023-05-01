import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Product, ProductDocument } from 'src/db-schemas/product.schema';
import { UserFavoriteService } from 'src/users/services/user-favorite.service';

@Injectable()
export class ProductFavoriteService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private userFavoriteService: UserFavoriteService,
  ) {}

  async addToFavorite(userId: ObjectId, productId: ObjectId) {
    const isProduct = await this.productModel.findById(productId);
    if (!isProduct) throw new NotFoundException(`Product with ID ${productId} not found`);
    return { favorites: await this.userFavoriteService.addToFavorites(userId, productId) };
  }

  async deleteToFavorite(userId: ObjectId, productId: ObjectId) {
    const isProduct = await this.productModel.findById(productId);
    if (!isProduct) throw new NotFoundException(`Product with ID ${productId} not found`);
    return { favorites: await this.userFavoriteService.deleteToFavorite(userId, productId) };
  }

  async userToFavorite(userId: ObjectId) {
    return { favorites: await this.userFavoriteService.userFavorite(userId) };
  }
}
