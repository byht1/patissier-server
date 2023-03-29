import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Product, ProductDocument } from 'src/db-schemas/product.schema';
import { UserAndStoreService } from 'src/users/services/user-and-store.service';

@Injectable()
export class ProductAndFavoriteService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private userAndStoreService: UserAndStoreService,
  ) {}

  async addToFavorite(userId: ObjectId, productId: ObjectId) {
    const isProduct = await this.productModel.findById(productId);
    if (!isProduct) throw new NotFoundException(`Product with ID ${productId} not found`);
    return { favorites: await this.userAndStoreService.addToFavorites(userId, productId) };
  }

  async deleteToFavorite(userId: ObjectId, productId: ObjectId) {
    console.log('🚀  ProductAndFavoriteService  userId:', userId);
    console.log('🚀  ProductAndFavoriteService  productId:', productId);
    const isProduct = await this.productModel.findById(productId);
    if (!isProduct) throw new NotFoundException(`Product with ID ${productId} not found`);
    return { favorites: await this.userAndStoreService.deleteToFavorite(userId, productId) };
  }
}
