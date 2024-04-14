import {render, screen} from '@testing-library/react';

import RatingForm from './rating-form';

describe('Component: RatingForm', () => {
  it('should render RatingForm component', () => {
    render(
      <RatingForm
        selectedValue={null}
        isFormsDisabled={false}
        onFieldChange={vi.fn()}
      />
    );

    expect(screen.getByTestId('rating-form')).toBeInTheDocument();
  });
});
