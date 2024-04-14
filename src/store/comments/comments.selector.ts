import {createSelector} from '@reduxjs/toolkit';

import {MAX_REVIEWS_VIEW, NameSpace} from '../../const';
import {Store} from '../../types/store-type';
import {sortCommentsByDate} from '../../utils/sort-utils';

type State = Pick<Store, NameSpace.Comments>;

export const selectRawComments = (state: State) => state[NameSpace.Comments].comments;
export const selectCommentsIsLoading = (state: State) => state[NameSpace.Comments].isLoading;
export const selectComments = createSelector(selectRawComments, (comments) =>
  comments
    .slice(0, MAX_REVIEWS_VIEW)
    .sort(sortCommentsByDate)
);
