import {Link} from 'react-router-dom';
import {useState} from 'react';
import {cities, sortTypes} from '../../const';
import PlaceCard from '../../components/place-card/place-card';
import Layout from '../../components/layout/layout';

type HomePageProps = {
  placeCount: number;
};

const HomePage = ({placeCount}: HomePageProps) => {
  const [sortOpened, setSortOpened] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>(cities[0].name);
  const [selectedSortType, setSelectedSortType,] = useState<string>(sortTypes[0].name);

  return (
    <Layout>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map(({id, name}) => (
              <li className="locations__item" key={id}>
                <Link
                  className={
                    selectedCity === name ?
                      'locations__item-link tabs__item tabs__item--active' :
                      'locations__item-link tabs__item'
                  }
                  to="#"
                  onClick={() => setSelectedCity(name)}
                >
                  <span>{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{placeCount} places to stay in Amsterdam</b>
            <form
              className="places__sorting"
              action="#"
              method="get"
              onClick={() => setSortOpened((prevState) => !prevState)}
            >
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width={7} height={4}>
                  <use xlinkHref="#icon-arrow-select" />
                </svg>
              </span>
              <ul className={`places__options places__options--custom ${sortOpened ? 'places__options--opened' : ''}`}>
                {sortTypes.map(({id, name}) => (
                  <li
                    className={
                      selectedSortType === name ?
                        'places__option places__option--active' :
                        'places__option'
                    }
                    tabIndex={0}
                    onClick={() => setSelectedSortType(name)}
                    key={id}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </form>
            <div className="cities__places-list places__list tabs__content">
              <PlaceCard />
              <PlaceCard />
              <PlaceCard />
              <PlaceCard />
              <PlaceCard />
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
