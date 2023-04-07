import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Product, ProductDocument } from 'src/db-schemas/product.schema';
import { BasketQueryParams } from '../dto';
import { selectField } from 'src/helpers';
import { UserBasketService } from 'src/users/services/user-basket.service';

@Injectable()
export class OrderBasketService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private userBasketService: UserBasketService,
  ) {}

  async addToBasket(userId: ObjectId, productId: ObjectId, params: BasketQueryParams) {
    const isProduct = await this.productModel.findById(productId);

    if (!isProduct) throw new NotFoundException(`Product with ID ${productId} not found`);
    const select = selectField({ ...params });

    return { basket: await this.userBasketService.addToBasket(userId, productId, select) };
  }

  async deleteToBasket(userId: ObjectId, productId: ObjectId, params: BasketQueryParams) {
    const isProduct = await this.productModel.findById(productId);

    if (!isProduct) throw new NotFoundException(`Product with ID ${productId} not found`);
    const select = selectField({ ...params });

    return { basket: await this.userBasketService.deleteToBasket(userId, productId, select) };
  }

  async allBasketId(userId: ObjectId, params: BasketQueryParams) {
    const select = selectField({ ...params });
    return { basket: await this.userBasketService.userBasket(userId, select) };
  }
}
