import {User} from './user-type';

export type Commet = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

export type Commets = Commet[]
