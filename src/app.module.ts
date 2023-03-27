import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './courses/courses.module';
import { UsersModule } from './users/users.module';
import { CatalogModule } from './catalog/catalog.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    CoursesModule,
    UsersModule,
    CatalogModule,
    ReviewsModule,
    AuthModule,
    StoreModule,
  ],
  providers: [],
})
export class AppModule {}
