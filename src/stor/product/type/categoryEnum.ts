export enum ECategory {
  CAKES = 'Торт',
  DESSERTS = 'Десерт',
  COOKIES = 'Печиво',
  BUNS = 'Булка',
  PIES = 'Пирог',
}

export type ECategoryUnion = `${ECategory}`;

export const convertorECategory = (typeJoin?: string) =>
  typeJoin ? Object.values(ECategory).join(typeJoin) : Object.values(ECategory);
