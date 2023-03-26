export const errorMessageDto = {
  notString: 'Variable is not a string',
  minLength: (value: string | number) => `The length of the field cannot be shorter than ${value} characters`,
  maxLength: (value: string | number) => `The length of the field cannot be longer than ${value} characters`,
  array: {
    minLength: (value: string | number = 1) => `The minimum length of the array must be ${value}`,
    maxLength: (value: string | number) => `The maximum length of the array must be ${value}`,
    notString: 'Each array element must be a string',
    notArray: 'The field should be filled with an array',
  },
};
