import {AppRoute, AuthorizationStatus} from '../../const';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import HomePage from '../../pages/home-page/home-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import OfferPage from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route/private-route';
import {Offers} from '../../types/offer-type';

type AppProps = {
  offers: Offers;
};

const App = ({offers}: AppProps) => (
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.HOME}
          element={<HomePage offers={offers} />}
        />
        <Route
          path={AppRoute.LOGIN}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.FAVORITES}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesPage offers={offers} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.OFFER}
          element={<OfferPage offers={offers} />}
        />
        <Route
          path={AppRoute.NOT_FOUND}
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;

