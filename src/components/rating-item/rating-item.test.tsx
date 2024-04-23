import {render, screen} from '@testing-library/react';

import RatingItem from './rating-item';
import {RATINGS} from '../../const';

describe('Component: RatingItem', () => {
  const rating = RATINGS[0];
  const selectedValue = RATINGS[0].id.toString();
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
