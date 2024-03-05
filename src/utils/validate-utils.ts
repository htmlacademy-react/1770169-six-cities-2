import {PASSWORD_REGEX, ReviewLength} from '../const';

const validateReviewLength = (review: string): boolean => review.length >= ReviewLength.MIN && review.length <= ReviewLength.MAX;

const validatePassword = (password: string): boolean => PASSWORD_REGEX.test(password);

export {validateReviewLength, validatePassword};
