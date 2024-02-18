import {Link} from 'react-router-dom';
import {useState} from 'react';
import {AuthorizationStatus, cities, sortTypes} from '../../const';
import {getFilteredOffers} from '../../components/utils/app-utils';
import {Offers} from '../../types/offer-type';
import Layout from '../../components/layout/layout';
import PlaceList from '../../components/place-list/place-list';

type HomePageProps = {
  offers: Offers;
  authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
};

const HomePage = ({offers, authorizationStatus}: HomePageProps) => {
  const [sortOpened, setSortOpened] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>(cities[0].name);
  const [selectedSortType, setSelectedSortType,] = useState<string>(sortTypes[0].name);

  const filteredOffers = getFilteredOffers(offers, selectedCity);

  return (
    <Layout mainClassName={filteredOffers.length ? '' : 'page__main page__main--index page__main--index-empty'}>
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
        <div className={`cities__places-container ${filteredOffers.length ? '' : 'cities__places-container--empty'} container`}>
          <section className={filteredOffers.length ? 'cities__places places' : 'cities__no-places'}>
            {filteredOffers.length ?
              <>
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} places to stay in {selectedCity}</b>
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
                <PlaceList offers={filteredOffers} authorizationStatus={authorizationStatus} />
              </> :
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
              </div>}
          </section>
          <div className="cities__right-section">
            {filteredOffers.length && <section className="cities__map map" />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
