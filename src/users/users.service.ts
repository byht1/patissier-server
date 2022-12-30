import { TAvatar } from './type/avatar';
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

    const isUser = await this.usersModel.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (isUser) {
      let mes = 'Username';

      if (isUser.email === email) mes = 'Email';

      throw new HttpException(`${mes} in use`, HttpStatus.CONFLICT);
    }

    const activeLInk = await this.emailMessage.newUserMessage(email);
    const hashPassword = await bcrypt.hash(password, 10);
    const avatar = this.generatorAvatars(username);

    const newUser = await this.usersModel.create({
      ...user,
      password: hashPassword,
      verificationToken: activeLInk,
      avatar_svg: avatar.svg,
      avatar_png: avatar.png,
    });

    const newToken = await this.generatorToken({ id: newUser._id });

    const res: { [key: string]: any } = { ...newUser };

    return { ...res._doc, token: newToken };
  }

  private generatorAvatars(name: string): TAvatar {
    return {
      png: `https://api.multiavatar.com/${name}.png`,
      svg: `https://api.multiavatar.com/${name}.svg`,
    };
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
