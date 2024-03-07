import {StatusCodes} from 'http-status-codes';

const MAX_IMAGES_VIEW = 6;

const MAX_REVIEWS_VIEW = 10;

const MAP_ZOOM = 10;

const API_URL = 'https://13.design.htmlacademy.pro/six-cities';

const REQUEST_TIMEOUT = 5000;

const PASSWORD_REGEX = /(?=^.{2,}$)((?=.*\d))(?=.*[A-Za-z]).*$/;

const TOKEN_KEY = 'AuthToken';

const AppRoute = {
  HOME: '/',
  LOGIN: '/login',
  FAVORITES: '/favorites',
  OFFER: '/offer',
  OFFER_ID: '/offer/:id',
  NOT_FOUND: '*'
} as const;

const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN'
} as const;

const cities = [
  {
    id: 1,
    name: 'Paris'
  },
  {
    id: 2,
    name: 'Cologne'
  },
  {
    id: 3,
    name: 'Brussels'
  },
  {
    id: 4,
    name: 'Amsterdam'
  },
  {
    id: 5,
    name: 'Hamburg'
  },
  {
    id: 6,
    name: 'Dusseldorf'
  }
] as const;

const sortTypes = [
  {
    id: 1,
    name: 'Popular'
  },
  {
    id: 2,
    name: 'Price: low to high'
  },
  {
    id: 3,
    name: 'Price: high to low'
  },
  {
    id: 4,
    name: 'Top rated first'
  }
] as const;

const ratings = [
  {
    id: 5,
    title: 'perfect'
  },
  {
    id: 4,
    title: 'good'
  },
  {
    id: 3,
    title: 'not bad'
  },
  {
    id: 2,
    title: 'badly'
  },
  {
    id: 1,
    title: 'terribly'
  },
];

const rating = [5, 100] as const;

const housing: Record<string, string> = {
  apartment: 'Apartment',
  room: 'Private Room',
  house: 'House',
  hotel: 'Hotel'
};

const DateFormat = {
  ATTRIBUTE_FORMAT: 'YYYY-MM-DD',
  REVIEW_DATE_FORMAT: 'MMMM YYYY'
};

const ReviewLength = {
  MIN: 50,
  MAX: 300
};

const IconPath = {
  DEFAULT_ICON_PATH: 'img/pin.svg',
  CURRENT_ICON_PATH: 'img/pin-active.svg'
};

const ApiRoute = {
  OFFERS: '/offers',
  FAVORITE: '/favorite',
  NEARBY: '/nearby',
  COMMENTS: '/comments',
  LOGIN: '/login',
  LOGOUT: '/logout'
};

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const ErrorMessage: Record<string, string> = {
  PASSWORD_ERROR_MESSAGE: 'Пароль должен состоять минимум из одной буквы и цифры'
};

export {
  MAX_IMAGES_VIEW,
  MAX_REVIEWS_VIEW,
  MAP_ZOOM,
  API_URL,
  REQUEST_TIMEOUT,
  PASSWORD_REGEX,
  TOKEN_KEY,
  AppRoute,
  AuthorizationStatus,
  cities,
  sortTypes,
  ratings,
  rating,
  housing,
  DateFormat,
  ReviewLength,
  IconPath,
  ApiRoute,
  StatusCodeMapping,
  ErrorMessage
};
