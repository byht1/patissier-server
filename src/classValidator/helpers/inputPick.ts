import { OrdersColumnName } from 'src/db-schemas/orders.schema';
import { StorColumnName } from 'src/db-schemas/stor.schema';

type TValueArray = StorColumnName[] | OrdersColumnName[];

export const inputPickSelect = (value: TValueArray): Record<string, number> =>
  [...value].reduce((acc, inputName) => {
    acc[inputName] = 1;
    return acc;
  }, {});
