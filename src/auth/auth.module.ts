import { UsersService } from './../users/users.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/db-schemas/users.schema';
import { EmailMessageModule } from 'src/email-message/email-message.module';
import { EmailMessageService } from 'src/email-message/email-message.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailMessageService, UsersService],
  exports: [AuthService, JwtModule, MongooseModule],
})
export class AuthModule {}
