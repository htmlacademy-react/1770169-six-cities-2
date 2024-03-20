import {NameSpace} from '../../const';
import {Store} from '../../types/store-type';

type State = Pick<Store, NameSpace.User>;

export const selectUser = (state: State) => state[NameSpace.User].user;
export const selectAuthorizationStatus = (state: State) => state[NameSpace.User].authorizationStatus;
