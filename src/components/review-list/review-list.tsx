import {AuthorizationStatus} from '../../const';
import {Authorization} from '../../types/app-type';
import {Comment} from '../../types/comment-type';
import ReviewCard from '../review-card/review-card';
import ReviewForm from '../review-form/review-form';

type ReviewListProps = {
  reviews: Comment[];
  authorizationStatus: Authorization;
  offerId: string;
}

const ReviewList = ({reviews, authorizationStatus, offerId}: ReviewListProps) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
      Reviews · <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ul className="reviews__list">
      {
        reviews.map((review) => <ReviewCard review={review} key={review.id} />)
      }
    </ul>
    {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm offerId={offerId} />}
  </section>
);

export default ReviewList;
