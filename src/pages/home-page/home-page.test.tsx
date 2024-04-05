import {render, screen} from '@testing-library/react';

import HomePage from './home-page';
import {withHistory, withStore} from '../../utils/mock-component-utils';
import {getMockOffer, getMockStore} from '../../utils/mock-utils';
import {cities, sortTypes} from '../../const';

describe('Page: HomePage', () => {
  it('should render empty home page', () => {
    const withHistoryComponent = withHistory(<HomePage />);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore());

    render(withStoreComponent);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });

  it('should render not empty home page', () => {
    const offers = Array.from({length: 3}, getMockOffer);
    const withHistoryComponent = withHistory(<HomePage />);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore({
      OFFERS: {
        offers: offers,
        location: cities[0].name,
        sortType: sortTypes[0].name,
        isLoading: false
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Places/i)[0]).toBeInTheDocument();
  });
});
