import {getFilteredOffers, getRandomElement, getRatingPercent} from './app-utils';
import {getMockOffer} from './mock-utils';

describe('Utils: App utils', () => {
  describe('Filter offers by name', () => {
    it('should return an array of cities filtered by city name', () => {
      const expectedArray = Array.from({length: 3}, getMockOffer);
      const offers = [
        ...expectedArray,
        {
          ...expectedArray[0],
          city: {
            ...expectedArray[0].city,
            name: 'Amsterdam'
          }
        }
      ];
      const result = getFilteredOffers(offers, 'Paris');

      expect(result).toMatchObject(expectedArray);
    });
  });

  describe('Get the amount of percent', () => {
    it('should return a string as a percentage', () => {
      const mockValue = 4;
      const expectedValue = '80%';
      const result = getRatingPercent(mockValue);

      expect(result).toMatchObject(expectedValue);
    });
  });

  describe('Get random element from array', () => {
    it('should return random element from array', () => {
      const mockArray = ['Get', 'random', 'element', 'from', 'array'];
      const result = getRandomElement(mockArray);

      expect(mockArray).toContain(result);
    });
  });
});
