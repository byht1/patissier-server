export enum ETypeSortProducts {
  MIN_MAX = 'min-max',
  MAX_MIN = 'max-min',
  POPULAR = 'popular',
  NEW = 'new',
  OLD = 'old',
}

export const convertorETypeSortProducts = (typeJoin?: string) => {
  const values = Object.values(ETypeSortProducts);

  if (typeJoin) {
    return values.join(typeJoin);
  }

  return values;
};
