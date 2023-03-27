import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/db-schemas/product.schema';
import { Orders, OrdersSchema } from 'src/db-schemas/orders.schema';
import { AuthModule } from 'src/auth/auth.module';
import { FirebaseStorageManager } from 'src/firebase';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Orders.name, schema: OrdersSchema }]),
    AuthModule,
  ],
  controllers: [ProductController, OrderController],
  providers: [ProductService, OrderService, FirebaseStorageManager],
})
export class StoreModule {}
