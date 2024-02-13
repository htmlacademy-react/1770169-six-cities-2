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
              <PlaceCard />
              <PlaceCard />
            </Favorite>
            <Favorite name={'Cologne'}>
              <PlaceCard />
            </Favorite>
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default FavoritesPage;
