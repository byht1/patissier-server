import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Orders, OrdersDocument } from 'src/db-schemas/orders.schema';
import { StorDocument } from 'src/db-schemas/stor.schema';
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
    const totalProseAndProductId = this.totalProseAndProductId(productList);
    if (productList.length !== products.length) {
      throw new HttpException('The product does not exist', HttpStatus.UNAUTHORIZED);
    }

    const order = await this.orderModel.create({
      ...createOrderDto,
      contactTime: {
        contactTimeString: contactTimeString,
        date: `${date} ${time}`,
      },
      totalPrise: totalProseAndProductId.totalPrice,
      products: totalProseAndProductId.productId,
      owner: userId,
    });

    return order;
  }

  private totalProseAndProductId(productList: StorDocument[]) {
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
