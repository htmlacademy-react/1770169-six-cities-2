import {useEffect} from 'react';

import {HelmetProvider} from 'react-helmet-async';
import {Route, Routes} from 'react-router-dom';

import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import HomePage from '../../pages/home-page/home-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import OfferPage from '../../pages/offer-page/offer-page';
import {getFavoriteOffersAction} from '../../store/api-actions';
import {selectCommentsIsLoading} from '../../store/comments/comments.selector';
import {selectFavoriteOffersIsLoading} from '../../store/favorite-offers/favorite-offers.selector';
import {selectNearbyOffersIsLoading} from '../../store/nearby-offers/nearby-offers.selector';
import {selectOfferIsLoading} from '../../store/offer/offer.selector';
import {selectOffersIsLoading} from '../../store/offers/offers.selector';
import {selectAuthorizationStatus} from '../../store/user/user.selector';
import Loader from '../loader/loader';
import PrivateRoute from '../private-route/private-route';

const App = () => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isOffersLoading = useAppSelector(selectOffersIsLoading);
  const isFavoriteOffersLoading = useAppSelector(selectFavoriteOffersIsLoading);
  const isNearbyOffersLoading = useAppSelector(selectNearbyOffersIsLoading);
  const isCommentsLoading = useAppSelector(selectCommentsIsLoading);
  const isSelectedOfferLoading = useAppSelector(selectOfferIsLoading);
  const isLoading = isOffersLoading ||
    isFavoriteOffersLoading ||
    isNearbyOffersLoading ||
    isCommentsLoading ||
    isSelectedOfferLoading;
  const dispatch = useAppDispatch();

  const isAuthenticated = authorizationStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getFavoriteOffersAction());
    }
  }, [dispatch, isAuthenticated]);

  if (authorizationStatus === AuthorizationStatus.Unknown && isLoading) {
    return <Loader />;
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Home}
          element={<HomePage />}
        />
        <Route
          path={AppRoute.Login}
          element={
            <PrivateRoute
              authorizationStatus={!isAuthenticated}
              appRoute={AppRoute.Home}
            >
              <LoginPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={isAuthenticated}
              appRoute={AppRoute.Login}
            >
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.OfferId}
          element={
            <OfferPage />
          }
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundPage />}
        />
      </Routes>
    </HelmetProvider>
  );
};

export default App;
