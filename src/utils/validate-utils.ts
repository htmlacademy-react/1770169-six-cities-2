import {PASSWORD_REGEX, ReviewLength} from '../const';

const validateReviewLength = (review: string) => review.length >= ReviewLength.MIN && review.length <= ReviewLength.MAX;

const validatePassword = (password: string) => PASSWORD_REGEX.test(password);

export {validateReviewLength, validatePassword};
