import {PropsWithChildren} from 'react';

import {Navigate} from 'react-router-dom';

import {AppRoute, AuthorizationStatus} from '../../const';
import {Authorization} from '../../types/app-type';

type PrivateRouteProps = PropsWithChildren<{
  authorizationStatus: Authorization ;
}>;

const PrivateRoute = ({authorizationStatus, children}: PrivateRouteProps) => (
  authorizationStatus === AuthorizationStatus.Auth ?
    children :
    <Navigate to={AppRoute.LOGIN} />
);

export default PrivateRoute;
