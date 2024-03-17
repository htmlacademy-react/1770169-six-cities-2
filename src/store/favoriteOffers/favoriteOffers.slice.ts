import {createSlice} from '@reduxjs/toolkit';

import {getFavoriteOffersAction, updateFavoriteOfferAction} from '../api-actions';
import {Offer} from '../../types/offer-type';
import {NameSpace} from '../../const';

type InitialState = {
  favoriteOffers: Offer[];
  isLoading: boolean;
};

const initialState: InitialState = {
  favoriteOffers: [],
  isLoading: false,
};

export const favoriteOffersSlice = createSlice({
  name: NameSpace.FavoriteOffers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFavoriteOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isLoading = false;
      })
      .addCase(getFavoriteOffersAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateFavoriteOfferAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFavoriteOfferAction.fulfilled, (state, action) => {
        const index = state.favoriteOffers.findIndex((offer) => offer.id === action.payload.id);

        if (index) {
          state.favoriteOffers = [
            ...state.favoriteOffers.slice(0, index),
            action.payload,
            ...state.favoriteOffers.slice(index + 1)
          ];
        }

        state.isLoading = false;
      })
      .addCase(updateFavoriteOfferAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
