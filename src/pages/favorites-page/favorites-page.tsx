import Favorite from '../../components/favorite/favorite';
import PlaceCard from '../../components/place-card/place-card';

const FavoritesPage = (): JSX.Element => (
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
);

export default FavoritesPage;
