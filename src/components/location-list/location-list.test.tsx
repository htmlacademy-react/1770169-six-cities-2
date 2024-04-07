import {render, screen} from '@testing-library/react';

import {cities} from '../../const';
import LocationList from './location-list';
import {withHistory} from '../../utils/mock-component-utils';

describe('Component: LocationList', () => {
  it('should render LocationList component', () => {
    const withHistoryComponent = withHistory(
      <LocationList
        locations={cities}
        selectedLocation={cities[1].name}
        onLocationClick={vi.fn()}
      />
    );
    render(withHistoryComponent);

    expect(screen.getByTestId('locations-list')).toBeInTheDocument();
  });
});
