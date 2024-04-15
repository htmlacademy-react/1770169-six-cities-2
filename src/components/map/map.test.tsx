import {render, screen} from '@testing-library/react';

import Map from './map';
import {getMockOffer} from '../../utils/mock-utils';

describe('Component: Map', () => {
  it('should render Map component', () => {
    const offers = Array.from({length: 3}, getMockOffer);

    render(<Map offers={offers} currentCard={''} />);

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
