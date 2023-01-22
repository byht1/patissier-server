import { UsersDocument } from 'src/db-schemas/users.schema';

export interface IRequestUser extends Express.Request {
  user: UsersDocument;
  currentToken: string;
}
