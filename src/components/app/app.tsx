import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import HomePage from '../../pages/home-page/home-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import OfferPage from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  placeCount: number;
  images: string[];
};

const App = ({placeCount, images}: AppProps) => (
  <BrowserRouter>
    <Routes>
      <Route
        path={AppRoute.HOME}
        element={<HomePage placeCount={placeCount} />}
      />
      <Route
        path={AppRoute.LOGIN}
        element={<LoginPage />}
      />
      <Route
        path={AppRoute.FAVORITES}
        element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <FavoritesPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.OFFER}
        element={<OfferPage images={images} />}
      />
      <Route
        path={AppRoute.NOT_FOUND}
        element={<NotFoundPage />}
      />
    </Routes>
  </BrowserRouter>
);

export default App;

