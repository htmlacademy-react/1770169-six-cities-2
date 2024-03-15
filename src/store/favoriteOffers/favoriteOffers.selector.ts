import {NameSpace} from '../../const';
import {Store} from '../../types/store-type';

type State = Pick<Store, 'favoriteOffers'>;

export const selectFavoriteOffers = (state: State) => state[NameSpace.FAVORITE_OFFERS].favoriteOffers;
export const selectFavoriteOffersIsLoading = (state: State) => state[NameSpace.FAVORITE_OFFERS].isLoading;
