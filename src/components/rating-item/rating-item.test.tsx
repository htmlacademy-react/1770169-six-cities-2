import {render, screen} from '@testing-library/react';

import {ratings} from '../../const';
import RatingItem from './rating-item';

describe('Component: RatingItem', () => {
  const rating = ratings[0];
  const selectedValue = ratings[0].id.toString();
  const isFormsDisabled = false;
  const handleFieldChange = vi.fn();

  it('should render RatingItem component', () => {
    render(
      <RatingItem
        rating={rating}
        selectedValue={null}
        isFormsDisabled={isFormsDisabled}
        onFieldChange={handleFieldChange}
      />
    );

    expect(screen.getByRole('radio')).toBeInTheDocument();
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

  it('should checked when change prop selectedValue', () => {
    const {rerender} = render(
      <RatingItem
        rating={rating}
        selectedValue={null}
        isFormsDisabled={isFormsDisabled}
        onFieldChange={handleFieldChange}
      />
    );

    rerender(
      <RatingItem
        rating={rating}
        selectedValue={selectedValue}
        isFormsDisabled={isFormsDisabled}
        onFieldChange={handleFieldChange}
      />
    );

    expect(screen.getByRole('radio')).toBeChecked();
  });
});
