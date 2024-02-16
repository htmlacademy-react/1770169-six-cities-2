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

const features = [
  {
    id: 1,
    name: 'Wi-Fi'
  },
  {
    id: 2,
    name: 'Washing machine'
  },
  {
    id: 3,
    name: 'Towels'
  },
  {
    id: 4,
    name: 'Heating'
  },
  {
    id: 5,
    name: 'Coffee machine'
  },
  {
    id: 6,
    name: 'Baby seat'
  },
  {
    id: 7,
    name: 'Kitchen'
  },
  {
    id: 8,
    name: 'Dishwasher'
  },
  {
    id: 9,
    name: 'Cabel TV'
  },
  {
    id: 10,
    name: 'Fridge'
  }
];

const rating = [5, 100] as const;

export {AppRoute, AuthorizationStatus, cities, sortTypes, ratings, features, rating};
