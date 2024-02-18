import {MAX_REVIEWS_VIEW} from '../../const';
import {Comments} from '../../types/comment-type';
import ReviewCard from '../review-card/review-card';
import {sortCommentsByDate} from '../utils/sort-utils';

type ReviewListProps = {
  reviews: Comments;
}

const ReviewList = ({reviews}: ReviewListProps) => (
  <ul className="reviews__list">
    {
      [...reviews]
        .sort(sortCommentsByDate)
        .slice(0, MAX_REVIEWS_VIEW)
        .map((review) => <ReviewCard review={review} key={review.id} />)
    }
  </ul>
);

export default ReviewList;
