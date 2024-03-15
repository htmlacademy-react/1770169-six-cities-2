import {createSlice} from '@reduxjs/toolkit';

import {getOffersAction} from '../api-actions';
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
  name: NameSpace.OFFER,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOffersAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isLoading = false;
      })
      .addCase(getOffersAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
