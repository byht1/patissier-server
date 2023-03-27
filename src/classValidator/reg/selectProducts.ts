//перевіряє, що значення поля складається з послідовності одного або більше літер, цифр та символів підкреслення (a-z, A-Z, _), розділених комою.
export const selectProductReg = {
  value: /^[a-zA-Z_]+(,[a-zA-Z_]+)*$/,
  message: 'Not a valid value',
};