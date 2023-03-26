import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StorSchema } from 'src/db-schemas/store.schema';
import { Orders, OrdersSchema } from 'src/db-schemas/orders.schema';
import { AuthModule } from 'src/auth/auth.module';
import { StoreFirebase } from 'src/firebase';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StorSchema }]),
    MongooseModule.forFeature([{ name: Orders.name, schema: OrdersSchema }]),
    AuthModule,
  ],
  controllers: [ProductController, OrderController],
  providers: [ProductService, OrderService, StoreFirebase],
})
export class StoreModule {}
