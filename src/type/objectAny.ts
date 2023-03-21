import { SortOrder } from 'mongoose';

export type DBSearch = {
  [key: string]: {
    $regex: string;
    $options: string;
  };
};

export type ObjectSortOrder = { [key: string]: SortOrder };
export type ObjectAny = { [key: string]: any };
export type ObjectAnyNumber = { [key: string]: number };
