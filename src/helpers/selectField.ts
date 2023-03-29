import { OrdersColumnName } from 'src/db-schemas/orders.schema';
import { StorColumnName } from 'src/db-schemas/product.schema';

type TValueArray = StorColumnName[] | OrdersColumnName[];

export const selectFieldFromDb = (value: TValueArray, number: 0 | 1 = 1): Record<string, number> =>
  [...value].reduce((acc, inputName) => {
    acc[inputName] = number;
    return acc;
  }, {});

export const selectField = (select: Record<string, string>): Record<string, number> => {
  const selectKey = Object.keys(select);
  const selectValue = Object.values(select);

  return selectValue.reduce((acc, x, i) => {
    if (!x) return acc;

    const value = x.split(',') as StorColumnName[];
    const pickOrOmit = selectKey[i] === 'pick_field' ? 1 : 0;
    acc = { ...acc, ...selectFieldFromDb(value, pickOrOmit) };

    return acc;
  }, {});
};
