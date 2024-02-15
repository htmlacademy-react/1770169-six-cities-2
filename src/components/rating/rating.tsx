import {ChangeEvent} from 'react';
import {ratings} from '../../const';
import RatingItem from '../rating-item/rating-item';

type RatingProps = {
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

const Rating = ({onChange}: RatingProps) => (
  <div className="reviews__rating-form form__rating">
    {ratings.map((rating) => <RatingItem key={rating.id} rating={rating} onChange={onChange} />)}
  </div>
);

export default Rating;
