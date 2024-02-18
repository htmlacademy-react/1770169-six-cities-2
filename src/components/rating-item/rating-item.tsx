import {ChangeEvent} from 'react';

type Rating = {
  id: number;
  title: string;
};

type RatingItemProps = {
  rating: Rating;
  selectedValue: string;
  isFormsDisabled: boolean;
  onFieldChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

const RatingItem = ({rating, selectedValue, isFormsDisabled, onFieldChange}: RatingItemProps) => {
  const {id, title} = rating;

  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={id}
        id={`${id}-stars`}
        type="radio"
        checked={parseInt(selectedValue, 10) === id}
        onChange={onFieldChange}
        disabled={isFormsDisabled}
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

export default RatingItem;
