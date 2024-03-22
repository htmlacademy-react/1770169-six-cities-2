import {PropsWithChildren} from 'react';

import {Navigate} from 'react-router-dom';

import {AppRoute} from '../../const';

type Keys = keyof typeof AppRoute;

type PrivateRouteProps = PropsWithChildren<{
  authorizationStatus: boolean ;
  appRoute: typeof AppRoute[Keys];
}>;

const PrivateRoute = ({authorizationStatus, appRoute, children}: PrivateRouteProps) => (
  authorizationStatus ?
    children :
    <Navigate to={appRoute} />
);

export default PrivateRoute;
