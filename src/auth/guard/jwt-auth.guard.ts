import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UsersDocument, Users } from 'src/db-schemas/users.schema';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const [bearer, token] = req.headers.authorization.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new HttpException('Не валідний токен', HttpStatus.FORBIDDEN);
      }

      const isValidToken = this.jwtService.verify(token);

      const user = await this.usersModel.findById(isValidToken.id);

      if (!user || !user.token.includes(token)) {
        user.token.filter(x => x !== token);
        user.save();
        throw new HttpException('Не валідний токен', HttpStatus.FORBIDDEN);
      }

      req.user = user;
      req.currentToken = token;

      return true;
    } catch (error) {
      throw new HttpException('Не валідний токен', HttpStatus.FORBIDDEN);
    }
  }
}
