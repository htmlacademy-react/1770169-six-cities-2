import {createSlice} from '@reduxjs/toolkit';

import {NameSpace} from '../../const';
import {Offer} from '../../types/offer-type';
import {getFavoriteOffersAction, updateFavoriteOfferAction} from '../api-actions';

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
        if (action.payload.isFavorite) {
          state.favoriteOffers.push(action.payload);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== action.payload.id);
        }

        state.isLoading = false;
      })
      .addCase(updateFavoriteOfferAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
