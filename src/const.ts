const MAX_IMAGES_VIEW = 6;

const MAX_REVIEWS_VIEW = 10;

const AppRoute = {
  HOME: '/',
  LOGIN: '/login',
  FAVORITES: '/favorites',
  OFFER: '/offer/:id',
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

export {
  MAX_IMAGES_VIEW,
  MAX_REVIEWS_VIEW,
  AppRoute,
  AuthorizationStatus,
  cities,
  sortTypes,
  ratings,
  rating,
  housing,
  DateFormat,
  ReviewLength
};
