import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { Users, UsersDocument } from 'src/db-schemas/users.schema';
import { NewUserDto } from './dto/newUsersDto';
import { TNewUser } from './type';
import { EmailMessageService } from 'src/email-message/email-message.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private jwtService: JwtService,
    private emailMessage: EmailMessageService,
  ) {}

  async signUp(user: NewUserDto): Promise<TNewUser> {
    const { email, password, username } = user;

    const activeLInk = this.emailMessage.newUserMessage(email);

    const isUser = await this.usersModel.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (isUser) {
      let mes = 'Username';

      if (isUser.email === email) mes = 'Email';

      throw new HttpException(`${mes} in use`, HttpStatus.CONFLICT);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersModel.create({
      ...user,
      password: hashPassword,
      // activeLInk: activeLInk,
    });
    console.log('🚀  UsersService  newUser', newUser);

    const token = await this.generatorToken({ id: newUser._id });

    const res: TNewUser = newUser;
    res.token = token;

    return res;
  }

  private async generatorToken(payload): Promise<string> {
    const id = payload.id;
    const token = this.jwtService.sign(payload);

    const user = await this.usersModel.findById(id);

    user.token.push(token);
    user.save();

    return token;
  }
}
