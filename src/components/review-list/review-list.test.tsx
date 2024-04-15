import {render, screen} from '@testing-library/react';

import ReviewList from './review-list';
import {AuthorizationStatus} from '../../const';
import {withStore} from '../../utils/mock-component-utils';
import {getMockStore} from '../../utils/mock-utils';


describe('Component: ReviewForm', () => {
  it('should render ReviewForm component', () => {
    const {withStoreComponent} = withStore(
      <ReviewList
        reviews={[]}
        authorizationStatus={AuthorizationStatus.Auth}
        offerId={''}
      />,
      getMockStore()
    );

    render(withStoreComponent);

    expect(screen.getByText(/Reviews ·/i)).toBeInTheDocument();
  });
});
