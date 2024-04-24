import {PASSWORD_REGEX, ReviewLength} from '../const';

const validateReviewLength = (review: string) => review.length >= ReviewLength.Min && review.length <= ReviewLength.Max;

const validatePassword = (password: string) => PASSWORD_REGEX.test(password);

export {validateReviewLength, validatePassword};
