export enum ETypeSortProducts {
  MIN_MAX = 'min-max',
  MAX_MIN = 'max-min',
  POPULAR = 'popular',
  NEW = 'new',
  OLD = 'old',
}

const { MAX_MIN, MIN_MAX, NEW, OLD, POPULAR } = ETypeSortProducts;

const sortExplanation = [
  { abbreviation: MAX_MIN, explanation: 'Сортування від дорогого до дешевшого' },
  { abbreviation: MIN_MAX, explanation: 'Сортування від дешевшого до дорогого' },
  { abbreviation: NEW, explanation: 'Спочатку нові' },
  { abbreviation: OLD, explanation: 'Спочатку старі' },
  { abbreviation: POPULAR, explanation: 'Спочатку популярні' },
];

export const convertorETypeSortProducts = (typeJoin?: string) => {
  const values = Object.values(ETypeSortProducts);

  if (typeJoin) {
    return values.join(typeJoin);
  }

  return values;
};

export const sortExplanationSwagger = () => {
  return sortExplanation.reduce((acc, el) => {
    const message = `<br /> <b>${el.abbreviation}</b> - ${el.explanation}`;
    acc += message;
    return acc;
  }, '');
};
