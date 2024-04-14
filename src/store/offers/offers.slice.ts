import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {cities, NameSpace, sortTypes} from '../../const';
import {LocationName, SortTypeName} from '../../types/app-type';
import {Offer} from '../../types/offer-type';
import {getOffersAction, updateFavoriteOfferAction} from '../api-actions';

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
  name: NameSpace.Offers,
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
      })
      .addCase(updateFavoriteOfferAction.fulfilled, (state, action) => {
        const index = state.offers.findIndex((offer) => offer.id === action.payload.id);

        if (index !== -1) {
          state.offers = [
            ...state.offers.slice(0, index),
            action.payload,
            ...state.offers.slice(index + 1)
          ];
        }
      });
  },
});

export const {changeLocation, changeSortType} = offersSlice.actions;
