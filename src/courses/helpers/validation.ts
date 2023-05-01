export const fieldsValid = Object.freeze({
  allowedCharacters: {
    value: /^[A-Za-zА-Яа-яҐґІіЇїЄє\s,'"'-.]+$/u,
    message:
      'The fiels should contain only letters of the Latin and Cyrillic alphabets, quotation marks, apostrophes and dashes',
  },
});