import { createSelector } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {Store} from '../../types/store-type';

type State = Pick<Store, NameSpace.FavoriteOffers>;

export const selectFavoriteOffers = (state: State) => state[NameSpace.FavoriteOffers].favoriteOffers;
export const selectFavoriteOffersIsLoading = (state: State) => state[NameSpace.FavoriteOffers].isLoading;
export const selectFavoriteCities = createSelector(selectFavoriteOffers, (favoriteOffers) =>
  [...new Set(favoriteOffers.map((favorite) => favorite.city.name))]
);
export const selectFavoriteOffersGroupedByCity = createSelector(
  selectFavoriteOffers,
  selectFavoriteCities,
  (favoriteOffers, favoriteCities) =>
    favoriteCities.map((city) => ({
      city,
      favoriteOffers: favoriteOffers.filter((offer) => offer.city.name === city)
    }))
);
