import {AuthorizationStatus, MAX_REVIEWS_VIEW} from '../../const';
import {Comments} from '../../types/comment-type';
import ReviewCard from '../review-card/review-card';
import ReviewForm from '../review-form/review-form';
import {sortCommentsByDate} from '../utils/sort-utils';

type ReviewListProps = {
  reviews: Comments;
  authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
}

const ReviewList = ({reviews, authorizationStatus}: ReviewListProps) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
      Reviews · <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ul className="reviews__list">
      {
        [...reviews]
          .sort(sortCommentsByDate)
          .slice(0, MAX_REVIEWS_VIEW)
          .map((review) => <ReviewCard review={review} key={review.id} />)
      }
    </ul>
    {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />}
  </section>
);

export default ReviewList;
