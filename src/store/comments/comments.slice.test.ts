import {getMockComment} from '../../utils/mock-utils';
import {createCommentAction, getCommentsAction} from '../api-actions';
import {commentsSlice} from './comments.slice';

describe('Comments slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      comments: [],
      isLoading: false,
    };
    const result = commentsSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      comments: [],
      isLoading: false,
    };
    const result = commentsSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "true" with "getCommentsAction.pending"', () => {
    const expectedState = {
      comments: [],
      isLoading: true,
    };
    const result = commentsSlice.reducer(undefined, getCommentsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "comments" to array with comments, "isLoading" to "false" with "getCommentsAction.fulfilled"', () => {
    const comments = Array.from({length: 3}, getMockComment);
    const expectedState = {
      comments,
      isLoading: false,
    };
    const result = commentsSlice.reducer(undefined, getCommentsAction.fulfilled(comments, '', ''));
    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "false" with "getCommentsAction.rejected"', () => {
    const expectedState = {
      comments: [],
      isLoading: false,
    };
    const result = commentsSlice.reducer(undefined, getCommentsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "true" with "createCommentAction.pending"', () => {
    const expectedState = {
      comments: [],
      isLoading: true,
    };
    const result = commentsSlice.reducer(undefined, createCommentAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should add to "comments" new comment, "isLoading" to "false" with "createCommentAction.fulfilled"', () => {
    const comment = getMockComment();
    const data = {
      comment: '',
      offerId: '',
      rating: 4
    };
    const expectedState = {
      comments: [comment],
      isLoading: false,
    };
    const result = commentsSlice.reducer(undefined, createCommentAction.fulfilled(comment, '', data));
    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "false" with "createCommentAction.rejected"', () => {
    const expectedState = {
      comments: [],
      isLoading: false,
    };
    const result = commentsSlice.reducer(undefined, createCommentAction.rejected);
    expect(result).toEqual(expectedState);
  });
});
