import {ChangeEvent} from 'react';

import {RATINGS} from '../../const';
import RatingItem from '../rating-item/rating-item';

type RatingFormProps = {
  selectedValue: string | null;
  isFormsDisabled: boolean;
  onFieldChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

const RatingForm = ({selectedValue, isFormsDisabled, onFieldChange}: RatingFormProps) => (
  <div className="reviews__rating-form form__rating" data-testid="rating-form">
    {RATINGS.map((rating) => (
      <RatingItem
        key={rating.id}
        rating={rating}
        selectedValue={selectedValue}
        isFormsDisabled={isFormsDisabled}
        onFieldChange={onFieldChange}
      />))}
  </div>
);

export default RatingForm;
