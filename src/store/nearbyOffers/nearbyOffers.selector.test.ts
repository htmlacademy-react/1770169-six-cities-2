import {selectNearbyOffers, selectNearbyOffersIsLoading} from './nearbyOffers.selector';
import {NameSpace} from '../../const';
import {getMockOffer} from '../../utils/mock-utils';

describe('NearbyOffers selectors', () => {
  const state = {
    [NameSpace.NearbyOffers]: {
      nearbyOffers: Array.from({length: 2}, getMockOffer),
      isLoading: false,
    }
  };

  it('should return nearby offers from state', () => {
    const {nearbyOffers} = state[NameSpace.NearbyOffers];
    const result = selectNearbyOffers(state);

    expect(result).toMatchObject(nearbyOffers);
  });

  it('should return loading status from state', () => {
    const {isLoading} = state[NameSpace.NearbyOffers];
    const result = selectNearbyOffersIsLoading(state);

    expect(result).toBe(isLoading);
  });
});
