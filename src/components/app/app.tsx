import {AppRoute, AuthorizationStatus} from '../../const';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {Comments} from '../../types/comment-type';
import {Offers} from '../../types/offer-type';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import HomePage from '../../pages/home-page/home-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import OfferPage from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  offers: Offers;
  comments: Comments;
};

const App = ({offers, comments}: AppProps) => (
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.HOME}
          element={<HomePage offers={offers} authorizationStatus={AuthorizationStatus.Auth} />}
        />
        <Route
          path={AppRoute.LOGIN}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.FAVORITES}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage offers={offers} authorizationStatus={AuthorizationStatus.Auth} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.OFFER_ID}
          element={
            <OfferPage
              offers={offers}
              comments={comments}
              authorizationStatus={AuthorizationStatus.Auth}
            />
          }
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

