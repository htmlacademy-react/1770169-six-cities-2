import {ChangeEvent} from 'react';

type Rating = {
  id: number;
  title: string;
};

type RatingProps = {
  rating: Rating;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

const Rating = ({rating, onChange}: RatingProps) => {
  const {id, title} = rating;
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={id}
        id={`${id}-stars`}
        type="radio"
        onChange={(evt: ChangeEvent<HTMLInputElement>) => onChange(evt)}
      />
      <label
        htmlFor={`${id}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
};

export default Rating;
