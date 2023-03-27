import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Orders, OrdersDocument } from 'src/db-schemas/orders.schema';
import { ProductDocument } from 'src/db-schemas/product.schema';
import { ProductService } from '../product/product.service';
import { CreateOrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Orders.name) private orderModel: Model<OrdersDocument>,
    private readonly storService: ProductService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto, userId: ObjectId) {
    const { products, contactTimeString, date, time } = createOrderDto;

    const productList = await this.storService.getProductsFindById(products, ['_id', 'price']);
    const totalPriceAndProductId = this.totalPriceAndProductId(productList);
    if (productList.length !== products.length) {
      throw new HttpException('The product does not exist', HttpStatus.UNAUTHORIZED);
    }

    const orderPromise = this.orderModel.create({
      ...createOrderDto,
      contactTime: {
        contactTimeString: contactTimeString,
        date: `${date} ${time}`,
      },
      totalPrise: totalPriceAndProductId.totalPrice,
      products: totalPriceAndProductId.productId,
      owner: userId,
    });
    const productUpdateOrder = productList.map(async product => this.storService.productOrders(product._id));
    const [order] = await Promise.all([orderPromise, ...productUpdateOrder]);

    return order;
  }

  private totalPriceAndProductId(productList: ProductDocument[]) {
    return productList.reduce(
      (acc, product) => {
        acc.productId.push(product._id);
        acc.totalPrice = acc.totalPrice + product.price;
        return acc;
      },
      { productId: [], totalPrice: 0 },
    );
  }
}
