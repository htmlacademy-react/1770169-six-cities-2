import {PropsWithChildren} from 'react';
import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

type PrivateRouteProps = PropsWithChildren<{
  authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
}>;

const PrivateRoute = ({authorizationStatus, children}: PrivateRouteProps) => (
  authorizationStatus === AuthorizationStatus.Auth ?
    children :
    <Navigate to={AppRoute.login} />
);

export default PrivateRoute;
