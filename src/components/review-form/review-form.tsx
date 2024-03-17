import {ChangeEvent, FormEvent, useState} from 'react';

import {ReviewLength} from '../../const';
import {useAppDispatch} from '../../hooks/use-store';
import {createCommentAction} from '../../store/api-actions';
import RatingForm from '../rating-form/rating-form';
import {validateReviewLength} from '../../utils/validate-utils';

type ReviewFormProps = {
  offerId: string;
};

const ReviewForm = ({offerId}: ReviewFormProps) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isFormsDisabled, setIsFormsDisabled] = useState(false);
  const dispatch = useAppDispatch();

  const setElementsDisabled = (isDisabled = true) => {
    setIsFormsDisabled(isDisabled);
    setIsButtonDisabled(isDisabled);
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(evt.target.value);

    if (validateReviewLength(evt.target.value) && rating) {
      return setIsButtonDisabled(false);
    }
    setIsButtonDisabled(true);
  };

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);

    if (validateReviewLength(review)) {
      return setIsButtonDisabled(false);
    }
    setIsButtonDisabled(true);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setElementsDisabled();
    dispatch(createCommentAction(
      {
        offerId,
        comment: review,
        rating: parseInt(rating, 10)
      }
    )).then((res) => {
      if (res.meta.requestStatus === 'rejected') {
        setElementsDisabled(false);
      } else {
        setReview('');
        setRating('');
        setIsFormsDisabled(false);
        setIsButtonDisabled(true);
      }
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <RatingForm
        selectedValue={rating}
        isFormsDisabled={isFormsDisabled}
        onFieldChange={handleRatingChange}
      />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={review}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleReviewChange}
        disabled={isFormsDisabled}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least
          <b className="reviews__text-amount">{`${ReviewLength.MIN} characters`}</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isButtonDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
