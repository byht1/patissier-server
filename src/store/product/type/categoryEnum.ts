import { ECategory } from 'src/db-schemas/product.schema';

export type ECategoryUnion = `${ECategory}`;

export const convertorECategory = (typeJoin?: string) =>
  typeJoin ? Object.values(ECategory).join(typeJoin) : Object.values(ECategory);
