import {createSelector} from '@reduxjs/toolkit';

import {NameSpace} from '../../const';
import {Store} from '../../types/store-type';
import {sort} from '../../utils/sort-utils';
import {getFilteredOffers} from '../../utils/app-utils';

type State = Pick<Store, NameSpace.Offers>;

export const selectRawOffers = (state: Store) => state[NameSpace.Offers].offers;
export const selectLocation = (state: Store) => state[NameSpace.Offers].location;
export const selectSortTypes = (state: Store) => state[NameSpace.Offers].sortType;
export const selectOffersIsLoading = (state: State) => state[NameSpace.Offers].isLoading;
export const selectOffers = createSelector(
  selectLocation,
  selectSortTypes,
  selectRawOffers,
  (location, sortType, offers) => sort[sortType](getFilteredOffers(offers, location))
);
