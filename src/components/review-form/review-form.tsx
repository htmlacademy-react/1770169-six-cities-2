import {ChangeEvent, FormEvent, useState} from 'react';
import {validateReviewLength} from '../utils/validate-utils';
import RatingForm from '../rating-form/rating-form';

const ReviewForm = () => {
  const [comment, setComment] = useState({
    review: '',
    rating: ''
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isFormsDisabled, setIsFormsDisabled] = useState(false);
  const {review, rating} = comment;

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setComment({...comment, [name]: value});

    if (validateReviewLength(review) && rating) {
      return setIsButtonDisabled(false);
    }

    setIsButtonDisabled(true);
  };
  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      setIsFormsDisabled(true);
      setIsButtonDisabled(true);
    } catch (error) {
      setIsFormsDisabled(false);
      setIsButtonDisabled(false);
    }
    setComment({...comment, review: '', rating: ''});
    setIsFormsDisabled(false);
    setIsButtonDisabled(true);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <RatingForm
        selectedValue={rating}
        isFormsDisabled={isFormsDisabled}
        onFieldChange={handleFieldChange}
      />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={review}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleFieldChange}
        disabled={isFormsDisabled}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least
          <b className="reviews__text-amount">50 characters</b>.
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
