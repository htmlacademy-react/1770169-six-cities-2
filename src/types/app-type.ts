import {AppRoute, AuthorizationStatus, CITIES, SORT_TYPES} from '../const';

export type Locations = typeof CITIES;

export type LocationName = typeof CITIES[number]['name'];

export type SortTypes = typeof SORT_TYPES;

export type SortTypeName = typeof SORT_TYPES[number]['name'];

export type Authorization = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

export type Route = typeof AppRoute[keyof typeof AppRoute];

export type DetailMessage = {
  type: string;
  message: string;
}
