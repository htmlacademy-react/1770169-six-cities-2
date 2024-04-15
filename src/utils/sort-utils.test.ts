import {sortTypes} from '../const';
import {getMockComment, getMockOffer} from './mock-utils';
import {sortCommentsByDate, sort} from './sort-utils';

describe('Utils: Sort utils', () => {
  describe('Sort comment by date', () => {
    it('should return comments sorted by date from the highest to the lowest', () => {
      const date = ['2022-09-24', '2023-04-05', '2021-12-11', '2024-01-01'];
      const sortedDate = ['2024-01-01', '2023-04-05', '2022-09-24', '2021-12-11'];
      const comment = getMockComment();
      const comments = date.map((item) => ({...comment, date: item}));
      const expectedComments = sortedDate.map((item) => ({...comment, date: item}));
      const result = comments.sort(sortCommentsByDate);

      expect(result).toMatchObject(expectedComments);
    });
  });

  describe('Sort offers', () => {
    const offer = getMockOffer();
    const price = [100, 400, 800, 200];

    it('should return offers sorted by ascending price from the highest to the lowest', () => {

      const sortedPrice = [800, 400, 200, 100];
      const offers = price.map((item) => ({...offer, price: item}));
      const expectedOffers = sortedPrice.map((item) => ({...offer, price: item}));
      const result = sort[sortTypes[2].name](offers);

      expect(result).toMatchObject(expectedOffers);
    });

    it('should return offers sorted by ascending price from the lowest to the highest', () => {
      const sortedPrice = [100, 200, 400, 800];
      const offers = price.map((item) => ({...offer, price: item}));
      const expectedOffers = sortedPrice.map((item) => ({...offer, price: item}));
      const result = sort[sortTypes[1].name](offers);

      expect(result).toMatchObject(expectedOffers);
    });

    it('should return offers sorted by rating from the highest to the lowest', () => {
      const rating = [4, 2, 5, 1];
      const sortedRating = [5, 4, 2, 1];
      const offers = rating.map((item) => ({...offer, rating: item}));
      const expectedOffers = sortedRating.map((item) => ({...offer, rating: item}));
      const result = sort[sortTypes[3].name](offers);

      expect(result).toMatchObject(expectedOffers);
    });
  });
});
