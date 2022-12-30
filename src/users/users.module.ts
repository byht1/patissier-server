import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/db-schemas/users.schema';
import { EmailMessageModule } from 'src/email-message/email-message.module';
import { EmailMessageService } from 'src/email-message/email-message.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '12h',
      },
    }),
    EmailMessageModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, EmailMessageService],
})
export class UsersModule {}
