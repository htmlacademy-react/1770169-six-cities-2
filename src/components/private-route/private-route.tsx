import {PropsWithChildren} from 'react';

import {Navigate} from 'react-router-dom';

import {AppRoute} from '../../const';

type AppRoute = typeof AppRoute;

type PrivateRouteProps = PropsWithChildren<{
  authorizationStatus: boolean ;
  appRoute: AppRoute[keyof AppRoute];
}>;

const PrivateRoute = ({authorizationStatus, appRoute, children}: PrivateRouteProps) => (
  authorizationStatus ?
    children :
    <Navigate to={appRoute} />
);

export default PrivateRoute;
