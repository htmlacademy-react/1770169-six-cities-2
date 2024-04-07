import {render, screen} from '@testing-library/react';


import {withStore} from '../../utils/mock-component-utils';
import {getMockStore} from '../../utils/mock-utils';
import ReviewForm from './review-form';
import userEvent from '@testing-library/user-event';

describe('Component: ReviewForm', () => {
  it('should render ReviewForm component', () => {
    const {withStoreComponent} = withStore(<ReviewForm offerId={''} />, getMockStore());

    render(withStoreComponent);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/To submit review please make sure to set and describe your stay with at least/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Submit'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Submit'})).not.toBeEnabled();
  });

  it('should render correctly ReviewForm component, when enter comment', async() => {
    const {withStoreComponent} = withStore(<ReviewForm offerId={''} />, getMockStore());
    const comment = 'New comment';

    render(withStoreComponent);

    await userEvent.type(screen.getByRole('textbox'), comment);

    expect(screen.getByDisplayValue(comment)).toBeInTheDocument();
  });
});
