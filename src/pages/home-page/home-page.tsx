import {MouseEvent, useState} from 'react';

import classNames from 'classnames';

import Layout from '../../components/layout/layout';
import LocationList from '../../components/location-list/location-list';
import Map from '../../components/map/map';
import PlaceList from '../../components/place-list/place-list';
import SortList from '../../components/sort-list/sort-list';
import {getFilteredOffers} from '../../utils/app-utils';
import {cities, sortTypes} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {changeLocation, changeSortType} from '../../store/action';
import {sort} from '../../utils/sort-utils';

const HomePage = () => {
  const [sortOpened, setSortOpened] = useState(false);
  const [currentCard, setCurrentCard] = useState('');
  const {authorizationStatus, offers, sortType, location} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const filteredOffers = getFilteredOffers(sort[sortType](offers), location);

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
          <LocationList
            locations={cities}
            selectedLocation={location}
            onLocationClick={(locationName) => dispatch(changeLocation(locationName))}
          />
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
                <b className="places__found">{filteredOffers.length} places to stay in {location}</b>
                <form
                  className="places__sorting"
                  action="#"
                  method="get"
                  onClick={() => setSortOpened((prevState) => !prevState)}
                >
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    {sortType}
                    <svg className="places__sorting-arrow" width={7} height={4}>
                      <use xlinkHref="#icon-arrow-select" />
                    </svg>
                  </span>
                  <SortList
                    sortTypeList={sortTypes}
                    sortOpened={sortOpened}
                    selectedSortType={sortType}
                    onSortTypeClick={(type) => dispatch(changeSortType(type))}
                  />
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
