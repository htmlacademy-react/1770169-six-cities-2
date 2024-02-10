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
  Uknown: 'UKNOWN'
} as const;

export {Path, AppRoute, AuthorizationStatus};
