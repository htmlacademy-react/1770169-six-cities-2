import {User} from './user-type';

export type Comment = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

export type CreateComment = Omit<Comment, 'date' | 'user'>
