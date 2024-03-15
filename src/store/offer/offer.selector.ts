import {NameSpace} from '../../const';
import {Store} from '../../types/store-type';

type State = Pick<Store, 'offer'>;

export const selectSelectedOffer = (state: State) => state[NameSpace.OFFER].selectedOffer;
export const selectSelectedOfferIsLoading = (state: State) => state[NameSpace.OFFER].isLoading;
