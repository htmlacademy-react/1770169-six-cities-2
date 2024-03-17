import {createSlice} from '@reduxjs/toolkit';

import {getOfferAction} from '../api-actions';
import {ExtendedOffer} from '../../types/offer-type';
import {NameSpace} from '../../const';

type InitialState = {
  selectedOffer: ExtendedOffer | null;
  isLoading: boolean;
};

const initialState: InitialState = {
  selectedOffer: null,
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
        state.selectedOffer = action.payload;
        state.isLoading = false;
      })
      .addCase(getOfferAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
