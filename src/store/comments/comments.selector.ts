import {NameSpace} from '../../const';
import {Store} from '../../types/store-type';

type State = Pick<Store, NameSpace.Comments>;

export const selectComments = (state: State) => state[NameSpace.Comments].comments;
export const selectCommentsIsLoading = (state: State) => state[NameSpace.Comments].isLoading;
