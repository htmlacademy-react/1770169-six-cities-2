import classNames from 'classnames';
import {Helmet} from 'react-helmet-async';

import Layout from '../../components/layout/layout';
import PlaceList from '../../components/place-list/place-list';
import {useAppSelector} from '../../hooks/use-store';
import {selectFavoriteOffers} from '../../store/favoriteOffers/favoriteOffers.selector';

const FavoritesPage = () => {
  const favoriteOffers = useAppSelector(selectFavoriteOffers);
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
        {favoriteOffers.length ?
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
                    placeCardClassName='favorites__card place-card'
                    imageWrapperClassName='favorites__image-wrapper place-card__image-wrapper'
                    cardInfoClassName='favorites__card-info place-card__info'
                    listClassName='favorites__places'
                  />
                </li>
              ))}
            </ul>
          </section> :
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">
                Save properties to narrow down search or plan your future trips.
              </p>
            </div>
          </section>}
      </div>
    </Layout>
  );
};

export default FavoritesPage;
