import {FullUser} from './user-type';
import {AppRoute, AuthorizationStatus, cities, sortTypes} from '../const';

export type Locations = typeof cities;

export type LocationName = typeof cities[number]['name'];

export type SortTypes = typeof sortTypes;

export type SortTypeName = typeof sortTypes[number]['name'];

export type Authorization = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

export type Route = typeof AppRoute[keyof typeof AppRoute];

export type DetailMessage = {
  type: string;
  message: string;
}

export type AuthStatus = {
  status: Authorization;
  user: FullUser | null;
}
