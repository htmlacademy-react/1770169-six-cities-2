import {render, screen} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import {cities} from '../../const';
import Location from './location';
import {withHistory} from '../../utils/mock-component-utils';

describe('Component: Location', () => {
  const location = cities[1].name;
  const handleLocationClick = vi.fn();

  it('should render Location component', () => {
    const withHistoryComponent = withHistory(
      <Location
        location={location}
        selectedLocation={location}
        onLocationClick={handleLocationClick}
      />
    );

    render(withHistoryComponent);

    expect(screen.getByText(location)).toBeInTheDocument();
    expect(screen.getByRole('link', {name: location})).toHaveClass('locations__item-link tabs__item tabs__item--active');
  });

  it('should onClick called, when user choose locations', async() => {
    const withHistoryComponent = withHistory(
      <Location
        location={location}
        selectedLocation={location}
        onLocationClick={handleLocationClick}
      />
    );

    render(withHistoryComponent);

    await userEvent.click(screen.getByRole('link', {name: location}));

    expect(handleLocationClick).toBeCalled();
    expect(handleLocationClick).nthCalledWith(1, location);
  });
});
