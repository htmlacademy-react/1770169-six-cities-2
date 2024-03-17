import {createSlice} from '@reduxjs/toolkit';

import {createCommentAction, getCommentsAction} from '../api-actions';
import {Comment} from '../../types/comment-type';
import {NameSpace} from '../../const';

type InitialState = {
  comments: Comment[];
  isLoading: boolean;
};

const initialState: InitialState = {
  comments: [],
  isLoading: false,
};

export const commentsSlice = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCommentsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      })
      .addCase(getCommentsAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createCommentAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCommentAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createCommentAction.rejected, (state) => {
        state.isLoading = true;
      });
  },
});
