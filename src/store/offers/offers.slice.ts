import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {getOffersAction} from '../api-actions';
import {NameSpace, cities, sortTypes} from '../../const';
import {LocationName, SortTypeName} from '../../types/app-type';
import {Offer} from '../../types/offer-type';

type InitialState = {
  location: LocationName;
  sortType: SortTypeName;
  offers: Offer[];
  isLoading: boolean;
};

const initialState: InitialState = {
  location: cities[0].name,
  sortType: sortTypes[0].name,
  offers: [],
  isLoading: false,
};

export const offersSlice = createSlice({
  name: NameSpace.OFFERS,
  initialState,
  reducers: {
    changeLocation: (state, action: PayloadAction<LocationName>) => {
      state.location = action.payload;
    },
    changeSortType: (state, action: PayloadAction<SortTypeName>) => {
      state.sortType = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(getOffersAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {changeLocation, changeSortType} = offersSlice.actions;
