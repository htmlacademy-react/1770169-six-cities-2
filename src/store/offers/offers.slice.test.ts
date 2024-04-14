import {cities, sortTypes} from '../../const';
import {getMockOffer} from '../../utils/mock-utils';
import {getOffersAction, updateFavoriteOfferAction} from '../api-actions';
import {changeLocation, changeSortType, offersSlice} from './offers.slice';

describe('Offers slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      location: cities[0].name,
      sortType: sortTypes[0].name,
      offers: [],
      isLoading: false,
    };
    const result = offersSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      location: cities[0].name,
      sortType: sortTypes[0].name,
      offers: [],
      isLoading: false,
    };
    const result = offersSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should change location with "changeLocation" action', () => {
    const expectedState = {
      location: cities[1].name,
      sortType: sortTypes[0].name,
      offers: [],
      isLoading: false,
    };
    const result = offersSlice.reducer(undefined, changeLocation(cities[1].name));
    expect(result).toEqual(expectedState);
  });

  it('should change sortType with "changeSortType" action', () => {
    const expectedState = {
      location: cities[0].name,
      sortType: sortTypes[1].name,
      offers: [],
      isLoading: false,
    };
    const result = offersSlice.reducer(undefined, changeSortType(sortTypes[1].name));
    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "true" with "getOffersAction.pending"', () => {
    const expectedState = {
      location: cities[0].name,
      sortType: sortTypes[0].name,
      offers: [],
      isLoading: true,
    };
    const result = offersSlice.reducer(undefined, getOffersAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "offers" to array with offers, "isLoading" to "false" with "getOffersAction.fulfilled"', () => {
    const offers = Array.from({length: 3}, getMockOffer);
    const expectedState = {
      location: cities[0].name,
      sortType: sortTypes[0].name,
      offers,
      isLoading: false,
    };
    const result = offersSlice.reducer(undefined, getOffersAction.fulfilled(offers, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "false" with "getOffersAction.rejected"', () => {
    const expectedState = {
      location: cities[0].name,
      sortType: sortTypes[0].name,
      offers: [],
      isLoading: false,
    };
    const result = offersSlice.reducer(undefined, getOffersAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should update "offers", "isLoading" to "false" with "updateFavoriteOfferAction.fulfilled"', () => {
    const offer = getMockOffer();
    const data = {
      id: '',
      status: 0
    };
    const initialState = {
      location: cities[0].name,
      sortType: sortTypes[0].name,
      offers: [{...offer, isFavorite: !offer.isFavorite}],
      isLoading: false,
    };
    const expectedState = {
      location: cities[0].name,
      sortType: sortTypes[0].name,
      offers: [offer],
      isLoading: false,
    };
    const result = offersSlice.reducer(initialState, updateFavoriteOfferAction.fulfilled(offer, '', data));
    expect(result).toEqual(expectedState);
  });
});
