import { registerDecorator, ValidationOptions } from 'class-validator';

export type TValidateRequestFieldsSetting<O = string, T = O> = {
  groupOne: O[];
  groupTwo: T[];
  isEmpty?: boolean;
};

const messageGenerate = (groupObject: TValidateRequestFieldsSetting) => {
  const groupOne = groupObject.groupOne;
  const groupTwo = groupObject.groupTwo;

  const messagesOne = groupOne.length > 1 ? 'Fields' : 'Field';
  const messagesTwo = groupTwo.length > 1 ? 'fields' : 'field';

  const errorMessage = groupObject.isEmpty ? 'should be used only together with' : 'cannot be used together with';

  return `${messagesOne} ${groupOne.join(', ')} ${errorMessage} ${messagesTwo} ${groupTwo.join(', ')}`;
};

export function ValidateRequestFields(
  groupObject: TValidateRequestFieldsSetting,
  validationOptions?: ValidationOptions,
) {
  return function (object: { [key: string | number | symbol]: any }, propertyName: string) {
    registerDecorator({
      name: 'validateRequestFields',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: messageGenerate(groupObject),
        ...validationOptions,
      },
      validator: {
        validate(value: any, { object }: any) {
          const { isEmpty = false } = groupObject;
          const groupOne = groupObject.groupOne?.reduce((acc, x) => {
            if (!object[x]) return acc;
            acc += 1;
            return acc;
          }, 0);
          const groupTwo = groupObject.groupTwo?.reduce((acc, x) => {
            if (!object[x]) return acc;
            acc += 1;
            return acc;
          }, 0);

          if (isEmpty) {
            if (groupOne !== groupTwo && groupOne) return false;
          } else {
            if (groupOne && groupTwo) return false;
          }

          return true;
        },
      },
    });
  };
}
