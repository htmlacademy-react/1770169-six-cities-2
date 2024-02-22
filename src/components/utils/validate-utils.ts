import {ReviewLength} from '../../const';

const validateReviewLength = (review: string): boolean => review.length >= ReviewLength.MIN && review.length <= ReviewLength.MAX;

export {validateReviewLength};
