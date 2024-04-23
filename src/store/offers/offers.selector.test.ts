import {
  selectLocation,
  selectOffers,
  selectOffersIsLoading,
  selectRawOffers,
  selectSortTypes
} from './offers.selector';
import {CITIES, NameSpace, SORT_TYPES} from '../../const';
import {getFilteredOffers} from '../../utils/app-utils';
import {getMockOffer} from '../../utils/mock-utils';
import {sort} from '../../utils/sort-utils';

describe('Offers selectors', () => {
  const state = {
    [NameSpace.Offers]: {
      location: CITIES[0].name,
      sortType: SORT_TYPES[1].name,
      offers: Array.from({length: 3}, getMockOffer),
      isLoading: false,
    }
  };

  it('should return raw offers from state', () => {
    const {offers} = state[NameSpace.Offers];
    const result = selectRawOffers(state);

    expect(result).toMatchObject(offers);
  });

  it('should return comments from state', () => {
    const {offers, sortType, location} = state[NameSpace.Offers];
    const sortedOffers = sort[sortType](getFilteredOffers(offers, location));

    const result = selectOffers.resultFunc(location, sortType, offers);

    expect(result).toMatchObject(sortedOffers);
  });

  it('should return location from state', () => {
    const {location} = state[NameSpace.Offers];
    const result = selectLocation(state);

    expect(result).toMatchObject(location);
  });

  it('should return sortType from state', () => {
    const {sortType} = state[NameSpace.Offers];
    const result = selectSortTypes(state);

    expect(result).toMatchObject(sortType);
  });

  it('should return loading status from state', () => {
    const {isLoading} = state[NameSpace.Offers];
    const result = selectOffersIsLoading(state);

    expect(result).toBe(isLoading);
  });
});
