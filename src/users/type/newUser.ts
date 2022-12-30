import { UsersDocument } from 'src/db-schemas/users.schema';

export type TNewUser = Omit<UsersDocument, 'token'> & {
  token: string | string[];
};
