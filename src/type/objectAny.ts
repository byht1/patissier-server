import { SortOrder } from 'mongoose';

export type TRegSearch = {
  $regex: string;
  $options: string;
};

export type DBSearch = {
  [key: string]: TRegSearch;
};

export type ObjectSortOrder = { [key: string]: SortOrder };
export type ObjectAny = { [key: string]: any };
export type ObjectAnyNumber = { [key: string]: number };
