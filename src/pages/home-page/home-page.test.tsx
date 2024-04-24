import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import HomePage from './home-page';
import {CITIES, SORT_TYPES} from '../../const';
import {withHistory, withStore} from '../../utils/mock-component-utils';
import {getMockOffer, getMockStore} from '../../utils/mock-utils';

describe('Page: HomePage', () => {
  const offers = Array.from({length: 3}, getMockOffer);

  it('should render empty home page', () => {
    const withHistoryComponent = withHistory(<HomePage />);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore());

    render(withStoreComponent);

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });

  it('should render not empty home page', () => {
    const withHistoryComponent = withHistory(<HomePage />);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore({
      OFFERS: {
        location: CITIES[0].name,
        sortType: SORT_TYPES[0].name,
        offers,
        isLoading: false
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText('Places')).toBeInTheDocument();
  });

  it('should open "placesOptions", when the user click the sorting of places', async() => {
    const withHistoryComponent = withHistory(<HomePage />);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore({
      OFFERS: {
        location: CITIES[0].name,
        sortType: SORT_TYPES[0].name,
        offers,
        isLoading: false
      }
    }));

    render(withStoreComponent);

    await userEvent.click(screen.getByTestId('places-sorting'));

    expect(screen.getByTestId('sort-list')).toHaveClass('places__options--opened');
  });
});
