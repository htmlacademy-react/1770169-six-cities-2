import {render, screen} from '@testing-library/react';

import LocationList from './location-list';
import {CITIES} from '../../const';
import {withHistory} from '../../utils/mock-component-utils';

describe('Component: LocationList', () => {
  it('should render LocationList component', () => {
    const withHistoryComponent = withHistory(
      <LocationList
        locations={CITIES}
        selectedLocation={CITIES[1].name}
        onLocationClick={vi.fn()}
      />
    );
    render(withHistoryComponent);

    expect(screen.getByTestId('locations-list')).toBeInTheDocument();
  });
});
