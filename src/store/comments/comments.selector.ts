import {NameSpace} from '../../const';
import {Store} from '../../types/store-type';

type State = Pick<Store, 'comments'>;

export const selectComments = (state: State) => state[NameSpace.COMMENTS].comments;
export const selectCommentsIsLoading = (state: State) => state[NameSpace.COMMENTS].isLoading;
