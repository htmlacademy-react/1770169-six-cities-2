import {selectComments, selectCommentsIsLoading, selectRawComments} from './comments.selector';
import {MAX_REVIEWS_VIEW, NameSpace} from '../../const';
import {getMockComment} from '../../utils/mock-utils';
import {sortCommentsByDate} from '../../utils/sort-utils';

describe('Comments selectors', () => {
  const state = {
    [NameSpace.Comments]: {
      comments: Array.from({length: 11}, getMockComment),
      isLoading: false,
    }
  };

  it('should return raw comments from state', () => {
    const {comments} = state[NameSpace.Comments];
    const result = selectRawComments(state);

    expect(result).toMatchObject(comments);
  });

  it('should return comments from state', () => {
    const {comments} = state[NameSpace.Comments];
    const sortedComments = comments
      .slice(0, MAX_REVIEWS_VIEW)
      .sort(sortCommentsByDate);

    const result = selectComments.resultFunc(comments);

    expect(result).toMatchObject(sortedComments);
  });

  it('should return loading status from state', () => {
    const {isLoading} = state[NameSpace.Comments];
    const result = selectCommentsIsLoading(state);

    expect(result).toBe(isLoading);
  });
});
