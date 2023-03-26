import { UsersDocument } from 'src/db-schemas/users.schema';

export interface IReqUser extends Express.Request {
  user: UsersDocument;
  currentToken: string;
}
