import { DBSearch } from 'src/type';

export const queryRegexGenerator = (arrayValue: string[], arrayKey: string[]): DBSearch => {
  return arrayKey.reduce<DBSearch>((acc, key, i) => {
    const value = arrayValue[i];

    if (value) {
      acc[key] = {
        $regex: value,
        $options: 'i',
      };
    }
    return acc;
  }, {});
};
