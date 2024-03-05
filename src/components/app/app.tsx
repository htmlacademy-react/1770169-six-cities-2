import {useEffect} from 'react';

import {HelmetProvider} from 'react-helmet-async';
import {Route, Routes} from 'react-router-dom';

import browserHistory from '../../browser-history';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import HomePage from '../../pages/home-page/home-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import OfferPage from '../../pages/offer-page/offer-page';
import {getFavoriteOffersAction} from '../../store/api-actions';
import HistoryRouter from '../history-route/history-route';
import Loader from '../loader/loader';
import PrivateRoute from '../private-route/private-route';


const App = () => {
  const {authorizationStatus, isLoading} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(getFavoriteOffersAction());
    }
  }, [dispatch, authorizationStatus]);

  if (authorizationStatus === AuthorizationStatus.Unknown && isLoading) {
    return <Loader />;
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.HOME}
            element={<HomePage />}
          />
          <Route
            path={AppRoute.LOGIN}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.FAVORITES}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.OFFER_ID}
            element={
              <OfferPage />
            }
          />
          <Route
            path={AppRoute.NOT_FOUND}
            element={<NotFoundPage />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
};

export default App;

