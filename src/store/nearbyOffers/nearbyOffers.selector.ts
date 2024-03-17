import {NameSpace} from '../../const';
import {Store} from '../../types/store-type';

type State = Pick<Store, NameSpace.NearbyOffers>;

export const selectNearbyOffers = (state: State) => state[NameSpace.NearbyOffers].nearbyOffers;
export const selectNearbyOffersIsLoading = (state: State) => state[NameSpace.NearbyOffers].isLoading;
