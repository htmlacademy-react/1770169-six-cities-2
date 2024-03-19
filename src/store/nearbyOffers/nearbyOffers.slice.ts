import {createSlice} from '@reduxjs/toolkit';

import {getNearbyOffersAction, updateFavoriteOfferAction} from '../api-actions';
import {Offer} from '../../types/offer-type';
import {NameSpace} from '../../const';

type InitialState = {
  nearbyOffers: Offer[];
  isLoading: boolean;
};

const initialState: InitialState = {
  nearbyOffers: [],
  isLoading: false,
};

export const nearbyOffersSlice = createSlice({
  name: NameSpace.NearbyOffers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getNearbyOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isLoading = false;
      })
      .addCase(getNearbyOffersAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateFavoriteOfferAction.fulfilled, (state, action) => {
        const index = state.nearbyOffers.findIndex((offer) => offer.id === action.payload.id);

        if (index !== -1) {
          state.nearbyOffers = [
            ...state.nearbyOffers.slice(0, index),
            action.payload,
            ...state.nearbyOffers.slice(index + 1)
          ];
        }
      });
  },
});
