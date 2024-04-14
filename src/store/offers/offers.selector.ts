import {createSelector} from '@reduxjs/toolkit';

import {NameSpace} from '../../const';
import {Store} from '../../types/store-type';
import {getFilteredOffers} from '../../utils/app-utils';
import {sort} from '../../utils/sort-utils';

type State = Pick<Store, NameSpace.Offers>;

export const selectRawOffers = (state: State) => state[NameSpace.Offers].offers;
export const selectLocation = (state: State) => state[NameSpace.Offers].location;
export const selectSortTypes = (state: State) => state[NameSpace.Offers].sortType;
export const selectOffersIsLoading = (state: State) => state[NameSpace.Offers].isLoading;
export const selectOffers = createSelector(
  selectLocation,
  selectSortTypes,
  selectRawOffers,
  (location, sortType, offers) => sort[sortType](getFilteredOffers(offers, location))
);
