import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/db-schemas/product.schema';
import { Orders, OrdersSchema } from 'src/db-schemas/orders.schema';
import { AuthModule } from 'src/auth/auth.module';
import { FirebaseStorageManager } from 'src/firebase';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/services/product.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { UsersModule } from 'src/users/users.module';
import { UserAndStoreService } from 'src/users/services/user-and-store.service';
import { ProductAndFavoriteService } from './product/services/product-and-favorite.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Orders.name, schema: OrdersSchema }]),
    AuthModule,
    UsersModule,
  ],
  controllers: [ProductController, OrderController],
  providers: [ProductService, OrderService, FirebaseStorageManager, ProductAndFavoriteService, UserAndStoreService],
})
export class StoreModule {}
