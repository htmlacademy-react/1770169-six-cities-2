import {NameSpace} from '../../const';
import {Store} from '../../types/store-type';

type State = Pick<Store, NameSpace.Offer>;

export const selectOffer = (state: State) => state[NameSpace.Offer].offer;
export const selectOfferIsLoading = (state: State) => state[NameSpace.Offer].isLoading;
