import Favorite from '../../components/favorite/favorite';
import Layout from '../../components/layout/layout';
import PlaceCard from '../../components/place-card/place-card';

const FAVORITE_COUNT = 2;

const FavoritesPage = () => {
  const containerClassName = FAVORITE_COUNT ? 'page' : 'page page--favorites-empty';
  const mainClassName = FAVORITE_COUNT ? 'page__main page__main--favorites' : 'page__main page__main--favorites page__main--favorites-empty';

  return (
    <Layout containerClassName={containerClassName} mainClassName={mainClassName}>
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <Favorite name={'Amsterdam'}>
              <PlaceCard
                placeCardClassName = 'favorites__card place-card'
                imageWrapperClassName = 'favorites__image-wrapper place-card__image-wrapper'
                cardInfoClassName = 'favorites__card-info place-card__info'
              />
              <PlaceCard
                placeCardClassName = 'cities__card place-card'
                imageWrapperClassName = 'cities__image-wrapper place-card__image-wrapper'
                cardInfoClassName = 'favorites__card-info place-card__info'
              />
            </Favorite>
            <Favorite name={'Cologne'}>
              <PlaceCard
                placeCardClassName = 'cities__card place-card'
                imageWrapperClassName = 'cities__image-wrapper place-card__image-wrapper'
                cardInfoClassName = 'favorites__card-info place-card__info'
              />
            </Favorite>
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default FavoritesPage;
