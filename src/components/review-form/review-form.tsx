import {ChangeEvent, FormEvent, useState} from 'react';

import {ReviewLength} from '../../const';
import {useAppDispatch} from '../../hooks/use-store';
import {createCommentAction} from '../../store/api-actions';
import {FormData} from '../../types/comment-type';
import {validateReviewLength} from '../../utils/validate-utils';
import RatingForm from '../rating-form/rating-form';

type ReviewFormProps = {
  offerId: string;
};

const ReviewForm = ({offerId}: ReviewFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    review: '',
    rating: null
  });
  const [isSending, setIsSending] = useState(false);
  const dispatch = useAppDispatch();

  const handleFormDataChange = (evt: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsSending(true);
    dispatch(createCommentAction(
      {
        offerId,
        comment: formData.review,
        rating: Number(formData.rating)
      }
    ))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          setFormData({
            ...formData,
            review: '',
            rating: null
          });
        }
      })
      .finally(() => setIsSending(false));
  };

  const isFormValid = validateReviewLength(formData.review) && formData.rating !== null;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <RatingForm
        selectedValue={formData.rating}
        isFormsDisabled={isSending}
        onFieldChange={handleFormDataChange}
      />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={formData.review}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleFormDataChange}
        disabled={isSending}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least
          <b className="reviews__text-amount">{`${ReviewLength.MIN} characters`}</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid || isSending}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
