import {StatusCodes} from 'http-status-codes';

const MAX_IMAGES_VIEW = 6;

const MAX_REVIEWS_VIEW = 10;

const MAX_NEARBY_OFFERS_VIEW = 3;

const API_URL = 'https://13.design.htmlacademy.pro/six-cities';

const REQUEST_TIMEOUT = 5000;

const PASSWORD_REGEX = /(?=^.{2,}$)((?=.*\d))(?=.*[A-Za-z]).*$/;

const TOKEN_KEY = 'AuthToken';

const CITIES = [
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

const SORT_TYPES = [
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

const RATINGS = [
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
] as const;

const AppRoute = {
  Home: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer',
  OfferId: '/offer/:id',
  NotFound: '*'
} as const;

const ApiRoute = {
  Offers: '/offers',
  Favorite: '/favorite',
  Nearby: '/nearby',
  Comments: '/comments',
  Login: '/login',
  Logout: '/logout'
} as const;

const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN'
} as const;

const ReviewLength = {
  Min: 50,
  Max: 300
} as const;

const RatingPercent = {
  Value: 5,
  Percent: 100
} as const;

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

const IconPath = {
  DEFAULT_ICON_PATH: '/img/pin.svg',
  CURRENT_ICON_PATH: '/img/pin-active.svg'
};

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const ErrorMessage: Record<string, string> = {
  PASSWORD_ERROR_MESSAGE: 'Пароль должен состоять минимум из одной латинской буквы и цифры'
};

enum NameSpace {
  Offer = 'OFFER',
  Offers = 'OFFERS',
  FavoriteOffers = 'FAVORITE_OFFERS',
  NearbyOffers = 'NEARBY_OFFERS',
  Comments = 'COMMENTS',
  User = 'USER'
}

export {
  MAX_IMAGES_VIEW,
  MAX_REVIEWS_VIEW,
  MAX_NEARBY_OFFERS_VIEW,
  API_URL,
  REQUEST_TIMEOUT,
  PASSWORD_REGEX,
  TOKEN_KEY,
  AppRoute,
  AuthorizationStatus,
  CITIES,
  SORT_TYPES,
  RATINGS,
  RatingPercent,
  housing,
  DateFormat,
  ReviewLength,
  IconPath,
  ApiRoute,
  StatusCodeMapping,
  ErrorMessage,
  NameSpace
};
