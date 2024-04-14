import {render, screen} from '@testing-library/react';

import Loader from './loader';

describe('Component: Loader', () => {
  it('should render Loader component', () => {
    render(<Loader />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
