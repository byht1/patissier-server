import { registerDecorator, ValidationOptions } from 'class-validator';

export function StringIsNumber(allowDecimal?: boolean, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    return registerDecorator({
      name: 'IsFileSize',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'The variable must be a string consisting only of numbers',
        ...validationOptions,
      },
      validator: {
        validate(srt: string) {
          if (allowDecimal) {
            const regExp = /^\d+(\.\d{1,2})?$/;
            return regExp.test(srt);
          }

          const regExp = /^\d+$/;
          return regExp.test(srt);
        },
      },
    });
  };
}
