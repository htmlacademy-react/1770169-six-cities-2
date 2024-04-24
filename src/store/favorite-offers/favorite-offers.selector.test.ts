import {
  selectFavoriteCities,
  selectFavoriteOffers,
  selectFavoriteOffersGroupedByCity,
  selectFavoriteOffersIsLoading
} from './favorite-offers.selector';
import {NameSpace} from '../../const';
import {getMockOffer} from '../../utils/mock-utils';

describe('FavoriteOffers selectors', () => {
  const state = {
    [NameSpace.FavoriteOffers]: {
      favoriteOffers: Array.from({length: 2}, getMockOffer),
      isLoading: false,
    }
  };

  it('should return favorite offers from state', () => {
    const {favoriteOffers} = state[NameSpace.FavoriteOffers];
    const result = selectFavoriteOffers(state);

    expect(result).toMatchObject(favoriteOffers);
  });

  it('should return favorite cities from state', () => {
    const {favoriteOffers} = state[NameSpace.FavoriteOffers];
    const cities = [...new Set(favoriteOffers.map((favorite) => favorite.city.name))];

    const result = selectFavoriteCities.resultFunc(favoriteOffers);

    expect(result).toMatchObject(cities);
  });

  it('should return favorite offers grouped by city from state', () => {
    const {favoriteOffers} = state[NameSpace.FavoriteOffers];
    const cities = [...new Set(favoriteOffers.map((favorite) => favorite.city.name))];
    const groupedFavoriteOffers = cities.map((city) => ({
      city,
      favoriteOffers: favoriteOffers.filter((offer) => offer.city.name === city)
    }));

    const result = selectFavoriteOffersGroupedByCity.resultFunc(favoriteOffers, cities);

    expect(result).toMatchObject(groupedFavoriteOffers);
  });

  it('should return loading status from state', () => {
    const {isLoading} = state[NameSpace.FavoriteOffers];
    const result = selectFavoriteOffersIsLoading(state);

    expect(result).toBe(isLoading);
  });
});
