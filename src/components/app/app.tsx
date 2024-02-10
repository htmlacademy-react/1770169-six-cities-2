import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import HomePage from '../../pages/home-page/home-page';
import Layout from '../layout/layout';
import LoginPage from '../../pages/login-page/login-page';
import NoFoundPage from '../../pages/no-found-page/no-found-page';
import OfferPage from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  placeCount: number;
  favorites: number;
  images: string[];
};

const App = ({placeCount, favorites, images}: AppProps): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route
        path={AppRoute.home}
        element={<Layout favorites={favorites} />}
      >
        <Route
          index
          element={<HomePage placeCount={placeCount} />}
        />
        <Route
          path={AppRoute.login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.offer}
          element={<OfferPage images={images} />}
        />
      </Route>
      <Route
        path={AppRoute.noFound}
        element={<NoFoundPage />}
      />
    </Routes>
  </BrowserRouter>
);

export default App;

