import {User} from './user-type';

export type Comment = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

export type CreateComment = {
  comment: string;
  offerId: string;
  rating: number;
}

export type FormData = {
  review: string;
  rating: string | null;
}
