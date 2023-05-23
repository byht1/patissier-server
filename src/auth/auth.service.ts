import { TAvatar } from './type/avatar';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { Users, UsersDocument } from 'src/db-schemas/users.schema';
import { TNewUser } from './type';
import { EmailMessageService } from 'src/email-message/email-message.service';
import { LogInDto, NewPasswordDto, NewUserDto } from './dto';
import { UsersService } from 'src/users/services/users.service';

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
    const hashPassword = await this.bcryptPassword(password);
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
    const isUser = await this.searchUser(login);

    await this.passwordIsValid(password, isUser.password);

    const token = await this.generatorToken(isUser._id);

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

  async newPassword(body: NewPasswordDto, user: UsersDocument): Promise<void> {
    const { password: oldPassword, newPassword } = body;

    await this.passwordIsValid(oldPassword, user.password);

    const hashPassword = await this.bcryptPassword(newPassword);

    await this.usersModel.findByIdAndUpdate(user._id, {
      password: hashPassword,
    });

    return;
  }

  async forgottenPassword(email: string): Promise<void> {
    const isUser = await this.searchUser(email);

    const link = await this.emailMessage.forgottenPassword(email);

    await this.usersModel.findByIdAndUpdate(isUser._id, {
      forgottenPasswordToken: link,
    });

    return;
  }

  async forgottenPasswordRedirect(linkId: string): Promise<boolean> {
    const user = await this.forgottenPasswordUserSearch(linkId);

    if(user) return true

    return false
  }

  async forgottenPasswordError(linkId: string): Promise<void> {
    const isUser = await this.forgottenPasswordUserSearch(linkId);

    await this.usersModel.findByIdAndUpdate(isUser._id, {
      forgottenPasswordToken: null,
    });

    return;
  }

  async forgottenPasswordNew(newPassword: string, linkId: string): Promise<void> {
    const isUser = await this.forgottenPasswordUserSearch(linkId);

    const hashPassword = await this.bcryptPassword(newPassword);

    await this.usersModel.findByIdAndUpdate(isUser._id, {
      password: hashPassword,
      token: [],
      forgottenPasswordToken: null,
    });

    return;
  }

  private async forgottenPasswordUserSearch(forgottenPasswordToken: string): Promise<UsersDocument> {
    const isUser = await this.usersModel.findOne({
      forgottenPasswordToken,
    });

    if (!isUser) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return isUser;
  }

  private async searchUser(login: string): Promise<UsersDocument> {
    let isUser;

    isUser = await this.usersService.userByEmail(login);

    if (!isUser) {
      isUser = await this.usersService.userByUsername(login);
    }

    if (!isUser) {
      throw new HttpException('User does not exist', HttpStatus.UNAUTHORIZED);
    }

    return isUser;
  }

  private async bcryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async passwordIsValid(password: string, userPassword: string) {
    const passwordEquals = await bcrypt.compare(password, userPassword);

    if (!passwordEquals) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }
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
