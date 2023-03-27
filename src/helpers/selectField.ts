import { OrdersColumnName } from 'src/db-schemas/orders.schema';
import { StorColumnName } from 'src/db-schemas/product.schema';

type TValueArray = StorColumnName[] | OrdersColumnName[];

export const selectFieldFromDb = (value: TValueArray, number: 0 | 1 = 1): Record<string, number> =>
  [...value].reduce((acc, inputName) => {
    acc[inputName] = number;
    return acc;
  }, {});
