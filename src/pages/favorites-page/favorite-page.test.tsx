import {render, screen} from '@testing-library/react';

import FavoritesPage from './favorites-page';
import {withHistory, withStore} from '../../utils/mock-component-utils';
import {getMockOffer, getMockStore} from '../../utils/mock-utils';

describe('Page: FavoritePage', () => {
  it('should render empty favorite page', () => {
    const withHistoryComponent = withHistory(<FavoritesPage />);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore());

    render(withStoreComponent);

    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });

  it('should render not empty favorite page', () => {
    const favoriteOffers = Array.from({length: 3}, getMockOffer);
    const withHistoryComponent = withHistory(<FavoritesPage />);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore({
      FAVORITE_OFFERS: {favoriteOffers, isLoading: false},
    }));

    render(withStoreComponent);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });
});
