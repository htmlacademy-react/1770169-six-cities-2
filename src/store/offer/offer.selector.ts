import {NameSpace} from '../../const';
import {Store} from '../../types/store-type';

type State = Pick<Store, NameSpace.Offer>;

export const selectSelectedOffer = (state: State) => state[NameSpace.Offer].selectedOffer;
export const selectSelectedOfferIsLoading = (state: State) => state[NameSpace.Offer].isLoading;
