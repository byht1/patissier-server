export enum ECategory {
  CAKES = 'Торт',
  DESSERTS = 'Десерт',
  COOKIES = 'Печиво',
  BUNS = 'Булка',
  PIES = 'Пирог',
}

export type ECategoryUnion = `${ECategory}`;

type TConvertorECategory<T extends string> = T extends 'notString' ? ECategoryUnion[] : string;

export const convertorECategory = <T extends string = 'notString'>(typeJoin?: T): TConvertorECategory<T> =>
  typeJoin
    ? (Object.values(ECategory).join(typeJoin) as TConvertorECategory<T>)
    : (Object.values(ECategory) as TConvertorECategory<T>);

// const testOne = convertorECategory(', ');
// const testTwo = convertorECategory();
