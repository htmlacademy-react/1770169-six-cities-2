import {createSlice} from '@reduxjs/toolkit';

import {getNearbyOffersAction} from '../api-actions';
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
  name: NameSpace.NEARBY_OFFERS,
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
      });
  },
});
