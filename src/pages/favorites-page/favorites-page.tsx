import {Helmet} from 'react-helmet-async';
import Layout from '../../components/layout/layout';
import PlaceCard from '../../components/place-card/place-card';

const favorites = [
  {
    id: '1',
    city: {
      name: 'Amsterdam'
    }
  },
  {
    id: '2',
    city: {
      name: 'Amsterdam'
    }
  },
  {
    id: '3',
    city: {
      name: 'Cologne'
    },
  }
];

const FavoritesPage = () => {
  const containerClassName = favorites.length ? 'page' : 'page page--favorites-empty';
  const mainClassName = favorites.length ? 'page__main page__main--favorites' : 'page__main page__main--favorites page__main--favorites-empty';
  const favoriteCities = new Set(favorites.map((favorite) => favorite.city.name));

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
                <div className="favorites__places">
                  {favorites.filter((favorite) => favorite.city.name === city).map((place) => (
                    <PlaceCard
                      placeCardClassName = 'favorites__card place-card'
                      imageWrapperClassName = 'favorites__image-wrapper place-card__image-wrapper'
                      cardInfoClassName = 'favorites__card-info place-card__info'
                      key={place.id}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default FavoritesPage;
