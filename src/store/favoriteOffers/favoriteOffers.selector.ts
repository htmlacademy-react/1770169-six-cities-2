import {NameSpace} from '../../const';
import {Store} from '../../types/store-type';

type State = Pick<Store, NameSpace.FavoriteOffers>;

export const selectFavoriteOffers = (state: State) => state[NameSpace.FavoriteOffers].favoriteOffers;
export const selectFavoriteOffersIsLoading = (state: State) => state[NameSpace.FavoriteOffers].isLoading;
