import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import HomePage from '../../pages/home-page/home-page';
import LoginPage from '../../pages/login-page/login-page';
import NoFoundPage from '../../pages/no-found-page/no-found-page';
import OfferPage from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  placeCount: number;
  images: string[];
};

const App = ({placeCount, images}: AppProps): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route
        path={AppRoute.home}
        element={<HomePage placeCount={placeCount} />}
      />
      <Route
        path={AppRoute.login}
        element={<LoginPage />}
      />
      <Route
        path={AppRoute.favorites}
        element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <FavoritesPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.offer}
        element={<OfferPage images={images} />}
      />
      <Route
        path={AppRoute.noFound}
        element={<NoFoundPage />}
      />
    </Routes>
  </BrowserRouter>
);

export default App;

