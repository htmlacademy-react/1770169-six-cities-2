import {createSelector} from '@reduxjs/toolkit';

import {NameSpace} from '../../const';
import {Store} from '../../types/store-type';
import {sort} from '../../utils/sort-utils';
import {getFilteredOffers} from '../../utils/app-utils';

type State = Pick<Store, 'offers'>;

export const selectRawOffers = (state: Store) => state[NameSpace.OFFERS].offers;
export const selectLocation = (state: Store) => state[NameSpace.OFFERS].location;
export const selectSortTypes = (state: Store) => state[NameSpace.OFFERS].sortType;
export const selectOffersIsLoading = (state: State) => state[NameSpace.OFFERS].isLoading;
export const selectOffers = createSelector(
  selectLocation,
  selectSortTypes,
  selectRawOffers,
  (location, sortType, offers) => sort[sortType](getFilteredOffers(offers, location))
);
