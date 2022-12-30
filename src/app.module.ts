import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './courses/courses.module';
import { UsersModule } from './users/users.module';
// import { EmailMessageModule } from './email-message/email-message.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    CoursesModule,
    UsersModule,
  ],
})
export class AppModule {}
