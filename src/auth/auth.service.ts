import { TAvatar } from './type/avatar';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { Users, UsersDocument } from 'src/db-schemas/users.schema';
import { TNewUser } from './type';
import { EmailMessageService } from 'src/email-message/email-message.service';
import { LogInDto, NewUserDto } from './dto';
import { UsersService } from 'src/users/users.service';

// 401 Access allowed only for registered users. доступ тільки для зареєстрованих

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private jwtService: JwtService,
    private emailMessage: EmailMessageService,
    private usersService: UsersService,
  ) {}

  async signUp(user: NewUserDto): Promise<TNewUser> {
    const { email, password, username } = user;

    const isUser = await this.usersService.userByEmail(email);

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

    const newToken = await this.generatorToken(newUser._id);

    const res: { [key: string]: any } = { ...newUser };

    return { ...res._doc, token: newToken };
  }

  async logIn(user: LogInDto): Promise<TNewUser> {
    const { login, password } = user;
    let isUser;

    isUser = await this.usersService.userByEmail(login);

    if (!isUser) {
      isUser = await this.usersService.userByUsername(login);
    }

    if (!isUser) {
      throw new HttpException('User does not exist', HttpStatus.UNAUTHORIZED);
    }

    const passwordEquals = await bcrypt.compare(password, isUser.password);

    if (!passwordEquals) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.generatorToken(isUser._id);
    console.log('🚀  AuthService  token', token);

    const res: { [key: string]: any } = { ...isUser };

    return { ...res._doc, token };
  }

  async logOut(user: UsersDocument, currentToken: string): Promise<void> {
    const id = user._id;
    const tokenDelete = user.token.filter(x => x !== currentToken);

    await this.usersModel.findByIdAndUpdate(id, { token: tokenDelete });

    return;
  }

  async verification(verificationToken: string): Promise<boolean> {
    const isUser = await this.usersModel.findOne({ verificationToken });

    if (!isUser) {
      return false;
    }

    isUser.verificationToken = null;
    isUser.verify = true;
    isUser.save();

    return true;
  }

  async refreshActiveLink(email: string): Promise<void> {
    const isUser = await this.usersService.userByEmail(email);

    if (!isUser) {
      throw new HttpException('User does not exist', HttpStatus.UNAUTHORIZED);
    }

    const activeLInk = await this.emailMessage.newUserMessage(email);

    await this.usersModel.findByIdAndUpdate(isUser._id),
      {
        verificationToken: activeLInk,
      };
  }

  private generatorAvatars(name: string): TAvatar {
    return {
      png: `https://api.multiavatar.com/${name}.png`,
      svg: `https://api.multiavatar.com/${name}.svg`,
    };
  }

  private async generatorToken(id: ObjectId): Promise<string> {
    const token = this.jwtService.sign({ id });

    const user = await this.usersModel.findById(id);

    user.token.push(token);
    user.save();

    return token;
  }
}
