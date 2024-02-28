import {MouseEvent, useState} from 'react';

import classNames from 'classnames';
import {Link} from 'react-router-dom';

import Layout from '../../components/layout/layout';
import Map from '../../components/map/map';
import PlaceList from '../../components/place-list/place-list';
import {getFilteredOffers} from '../../components/utils/app-utils';
import {AuthorizationStatus, cities, sortTypes} from '../../const';
import {Offers} from '../../types/offer-type';

type HomePageProps = {
  offers: Offers;
  authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
};

const HomePage = ({offers, authorizationStatus}: HomePageProps) => {
  const [sortOpened, setSortOpened] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>(cities[0].name);
  const [selectedSortType, setSelectedSortType,] = useState<string>(sortTypes[0].name);
  const [currentCard, setCurrentCard] = useState('');

  const filteredOffers = getFilteredOffers(offers, selectedCity);

  const handlePlaceCardMouseOver = (evt: MouseEvent) => {
    const {cardId} = (evt.target as HTMLElement).dataset;

    if (cardId) {
      setCurrentCard(cardId);
    }
  };

  return (
    <Layout mainClassName={classNames({
      'page__main page__main--index page__main--index-empty': !filteredOffers.length
    })}
    >
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map(({id, name}) => (
              <li className="locations__item" key={id}>
                <Link
                  className={classNames({
                    'locations__item-link tabs__item tabs__item--active': selectedCity === name,
                    'locations__item-link tabs__item': selectedCity !== name
                  })}
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
        <div className={classNames(
          'cities__places-container',
          {'cities__places-container--empty': !filteredOffers.length},
          'container')}
        >
          <section className={classNames({
            'cities__places places': filteredOffers.length,
            'cities__no-places': !filteredOffers.length
          })}
          >
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
                  <ul className={classNames(
                    'places__options places__options--custom',
                    {'places__options--opened': sortOpened}
                  )}
                  >
                    {sortTypes.map(({id, name}) => (
                      <li
                        className={classNames({
                          'places__option places__option--active': selectedSortType === name,
                          'places__option': selectedSortType !== name
                        })}
                        tabIndex={0}
                        onClick={() => setSelectedSortType(name)}
                        key={id}
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </form>
                <PlaceList
                  offers={filteredOffers}
                  authorizationStatus={authorizationStatus}
                  onMouseOver={handlePlaceCardMouseOver}
                />
              </> :
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
              </div>}
          </section>
          <div className="cities__right-section">
            {filteredOffers.length &&
            <section className="cities__map map">
              <Map offers={filteredOffers} currentCard={currentCard} />
            </section>}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
