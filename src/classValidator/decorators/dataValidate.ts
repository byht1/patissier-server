import { registerDecorator, ValidationOptions } from 'class-validator';
import * as date from 'date-and-time';

type TDateParams =
  | {
      pattern?: string;
      minDate?: Date;
      maxDate?: Date;
    }
  | undefined;

export function IsDateValid(
  { pattern = 'DD.MM.YYYY', minDate = new Date('1900-01-01'), maxDate = new Date() }: TDateParams,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    return registerDecorator({
      name: 'IsValidDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'The date is not valid',
        ...validationOptions,
      },
      validator: {
        validate(value: string) {
          const parsedDate = date.parse(value, pattern);

          if (isNaN(parsedDate.getTime())) return false;

          const userDate = new Date(value.split('.').reverse().join('-'));

          const minDifference = date.subtract(userDate, minDate).toDays();
          const difference = date.subtract(userDate, maxDate).toDays();

          if (difference > 1 || minDifference < -1) return false;

          return true;
        },
      },
    });
  };
}
