import {NameSpace} from '../../const';
import {Store} from '../../types/store-type';

type State = Pick<Store, 'nearbyOffers'>;

export const selectNearbyOffers = (state: State) => state[NameSpace.NEARBY_OFFERS].nearbyOffers;
export const selectNearbyOffersIsLoading = (state: State) => state[NameSpace.NEARBY_OFFERS].isLoading;
