import {datatype} from 'faker';

import {validatePassword, validateReviewLength} from './validate-utils';

describe('Utils: Validate utils', () => {
  describe('Validate review length', () => {
    it('should return "false" if the review length is less than "50"', () => {
      const text = datatype.string(49);
      const result = validateReviewLength(text);

      expect(result).toEqual(false);
    });

    it('should return "false" if the review length is greater than "300"', () => {
      const text = datatype.string(301);
      const result = validateReviewLength(text);

      expect(result).toEqual(false);
    });

    it('should return "true" if the review length is greater or equal than to "50" and less or equal than "300"', () => {
      const text = datatype.string(100);
      const result = validateReviewLength(text);

      expect(result).toEqual(true);
    });
  });

  describe('Validate password', () => {
    it('should return "false" if the password does not match the "Consists of at least one letter and a number"', () => {
      const password = 'onlyLetters';
      const result = validatePassword(password);
      expect(result).toEqual(false);
    });

    it('should return "true" if the password does match the "Consists of at least one letter and a number"', () => {
      const password = 'LettersAnd555';
      const result = validatePassword(password);

      expect(result).toEqual(true);
    });
  });
});
