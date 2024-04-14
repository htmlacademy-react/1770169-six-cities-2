import {createSlice} from '@reduxjs/toolkit';

import {NameSpace} from '../../const';
import {ExtendedOffer} from '../../types/offer-type';
import {getOfferAction, updateFavoriteOfferAction} from '../api-actions';

type InitialState = {
  offer: ExtendedOffer | null;
  isLoading: boolean;
};

const initialState: InitialState = {
  offer: null,
  isLoading: false,
};

export const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOfferAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isLoading = false;
      })
      .addCase(getOfferAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateFavoriteOfferAction.fulfilled, (state, action) => {
        if (state.offer && state.offer.id === action.payload.id) {
          state.offer.isFavorite = action.payload.isFavorite;
        }
      });
  },
});
