import {MemoryHistory, createMemoryHistory} from 'history';

import {screen, render} from '@testing-library/react';

import App from './app';
import {AppRoute, AuthorizationStatus, cities, sortTypes} from '../../const';
import {withHistory, withStore} from '../../utils/mock-component-utils';
import {getMockExtendedOffer, getMockOffer, getMockStore} from '../../utils/mock-utils';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "HomePage" when navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore());
    mockHistory.push(AppRoute.HOME);

    render(withStoreComponent);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render "LoginPage" when navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore());
    mockHistory.push(AppRoute.LOGIN);

    render(withStoreComponent);

    expect(screen.getAllByText(/Sign in/i)[0]).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when navigate to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore({
      USER: {user: null, authorizationStatus: AuthorizationStatus.Auth}
    }));
    mockHistory.push(AppRoute.FAVORITES);

    render(withStoreComponent);

    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });

  it('should render "OfferPage" when navigate to "/offer/:id"', () => {
    const offers = Array.from({length: 3}, getMockOffer);
    const offer = {...getMockExtendedOffer(), id: offers[0].id};
    const withHistoryComponent = withHistory(<App />, mockHistory);

    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore({
      OFFER: {offer, isLoading: false},
      OFFERS: {
        location: cities[0].name,
        sortType: sortTypes[0].name,
        offers,
        isLoading: false
      }
    }));
    mockHistory.push(`${AppRoute.OFFER}/${offer.id}`);

    render(withStoreComponent);

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when navigate to "*"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore());
    mockHistory.push('/unknown-route');

    render(withStoreComponent);

    expect(screen.getByText(/OPPS! Page no found/i)).toBeInTheDocument();
  });
});
