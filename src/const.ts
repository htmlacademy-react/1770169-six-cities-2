const Path = {
  HOME: 'home',
  LOGIN: 'login',
  FAVORITES: 'favorites',
  OFFER: 'offer',
  NO_FOUND: 'noFound'
};

const AppRoute = {
  [Path.HOME]: '/',
  [Path.LOGIN]: '/login',
  [Path.FAVORITES]: '/favorites',
  [Path.OFFER]: '/offer/:id',
  [Path.NO_FOUND]: '*'
} as const;

const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN'
} as const;

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

const OPTIONS = [
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
    id: 1,
    title: 'terribly'
  },
  {
    id: 2,
    title: 'badly'
  },
  {
    id: 3,
    title: 'not bad'
  },
  {
    id: 4,
    title: 'good'
  },
  {
    id: 5,
    title: 'perfect'
  },
];

const FEATURES = [
  {
    id: 1,
    feature: 'Wi-Fi'
  },
  {
    id: 2,
    feature: 'Washing machine'
  },
  {
    id: 3,
    feature: 'Towels'
  },
  {
    id: 4,
    feature: 'Heating'
  },
  {
    id: 5,
    feature: 'Coffee machine'
  },
  {
    id: 6,
    feature: 'Baby seat'
  },
  {
    id: 7,
    feature: 'Kitchen'
  },
  {
    id: 8,
    feature: 'Dishwasher'
  },
  {
    id: 9,
    feature: 'Cabel TV'
  },
  {
    id: 10,
    feature: 'Fridge'
  }
];

export {Path, AppRoute, AuthorizationStatus, CITIES, OPTIONS, RATINGS, FEATURES};
