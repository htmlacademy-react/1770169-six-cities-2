import {Helmet} from 'react-helmet-async';
import Layout from '../../components/layout/layout';
import PlaceList from '../../components/place-list/place-list';
import {Offers} from '../../types/offer-type';

type FavoritesPageProps = {
  offers: Offers;
}

const FavoritesPage = ({offers}: FavoritesPageProps) => {
  const favorites = offers.filter((offer) => offer.isFavorite);
  const favoriteCities = new Set(favorites.map((favorite) => favorite.city.name));
  const containerClassName = favorites.length ? 'page' : 'page page--favorites-empty';
  const mainClassName = favorites.length ? 'page__main page__main--favorites' : 'page__main page__main--favorites page__main--favorites-empty';

  return (
    <Layout containerClassName={containerClassName} mainClassName={mainClassName}>
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
                  offers={favorites.filter((favorite) => favorite.city.name === city)}
                  placeCardClassName = 'favorites__card place-card'
                  imageWrapperClassName = 'favorites__image-wrapper place-card__image-wrapper'
                  cardInfoClassName = 'favorites__card-info place-card__info'
                  listClassName = 'favorites__places'
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
