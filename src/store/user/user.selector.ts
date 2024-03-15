import {NameSpace} from '../../const';
import {Store} from '../../types/store-type';

type State = Pick<Store, 'user'>;

export const selectUser = (state: State) => state[NameSpace.USER].user;
export const selectAuthorizationStatus = (state: State) => state[NameSpace.USER].authorizationStatus;
