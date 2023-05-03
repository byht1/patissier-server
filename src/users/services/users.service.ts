import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Users, UsersDocument } from 'src/db-schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async userById(id: ObjectId): Promise<UsersDocument> {
    return await this.usersModel.findById(id);
  }

  async userByEmail(email: string): Promise<UsersDocument> {
    return await this.usersModel.findOne({ email: email });
  }

  async userByUsername(username: string): Promise<UsersDocument> {
    return await this.usersModel.findOne({ username: username });
  }
}