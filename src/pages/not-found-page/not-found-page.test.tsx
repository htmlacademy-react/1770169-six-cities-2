import {render, screen} from '@testing-library/react';

import NotFoundPage from './not-found-page';
import {withHistory} from '../../utils/mock-component-utils';

describe('Page: NotFoundPage', () => {
  it('should render not found page', () => {
    const withHistoryComponent = withHistory(<NotFoundPage />);

    render(withHistoryComponent);

    expect(screen.getByText(/OPPS! Page no found/i)).toBeInTheDocument();
  });
});
