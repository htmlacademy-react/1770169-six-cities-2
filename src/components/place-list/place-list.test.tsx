import {render, screen} from '@testing-library/react';

import PlaceList from './place-list';
import {withHistory, withStore} from '../../utils/mock-component-utils';
import {getMockOffer, getMockStore} from '../../utils/mock-utils';

describe('Component: PlaceList', () => {
  const offers = Array.from({length: 3}, getMockOffer);

  it('should render PlaceList component', () => {
    const withHistoryComponent = withHistory(<PlaceList offers={offers} />);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore());

    render(withStoreComponent);

    expect(screen.getByTestId('places-list')).toBeInTheDocument();
  });
});
