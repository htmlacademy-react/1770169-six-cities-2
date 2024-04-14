import {NameSpace} from '../../const';
import {getMockExtendedOffer} from '../../utils/mock-utils';
import {selectOffer, selectOfferIsLoading} from './offer.selector';

describe('Offer selectors', () => {
  const state = {
    [NameSpace.Offer]: {
      offer: getMockExtendedOffer(),
      isLoading: false,
    }
  };

  it('should return offer from state', () => {
    const {offer} = state[NameSpace.Offer];
    const result = selectOffer(state);

    expect(result).toEqual(offer);
  });

  it('should return loading status from state', () => {
    const {isLoading} = state[NameSpace.Offer];
    const result = selectOfferIsLoading(state);

    expect(result).toBe(isLoading);
  });
});
