import classNames from 'classnames';
import {Helmet} from 'react-helmet-async';

import Layout from '../../components/layout/layout';
import PlaceList from '../../components/place-list/place-list';
import {useAppSelector} from '../../hooks/use-store';

const FavoritesPage = () => {
  const {authorizationStatus, favoriteOffers} = useAppSelector((state) => state);
  const favoriteCities = new Set(favoriteOffers.map((favorite) => favorite.city.name));

  return (
    <Layout
      containerClassName={classNames({
        'page': favoriteOffers.length,
        'page page--favorites-empty': !favoriteOffers.length
      })}
      mainClassName={classNames({
        'page__main page__main--favorites': favoriteOffers.length,
        'page__main page__main--favorites page__main--favorites-empty': !favoriteOffers.length
      })}
    >
      <Helmet>
        <title>6 cities | Saved listing</title>
      </Helmet>
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {[...favoriteCities].map((city) => (
              <li className="favorites__locations-items" key={city}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{city}</span>
                    </a>
                  </div>
                </div>
                <PlaceList
                  offers={favoriteOffers.filter((favorite) => favorite.city.name === city)}
                  authorizationStatus={authorizationStatus}
                  placeCardClassName='favorites__card place-card'
                  imageWrapperClassName='favorites__image-wrapper place-card__image-wrapper'
                  cardInfoClassName='favorites__card-info place-card__info'
                  listClassName='favorites__places'
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default FavoritesPage;
