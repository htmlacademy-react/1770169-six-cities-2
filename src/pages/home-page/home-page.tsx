import {MouseEvent, useState} from 'react';

import classNames from 'classnames';

import Layout from '../../components/layout/layout';
import LocationList from '../../components/location-list/location-list';
import Map from '../../components/map/map';
import PlaceList from '../../components/place-list/place-list';
import SortList from '../../components/sort-list/sort-list';
import {cities, sortTypes} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import {selectLocation, selectOffers, selectSortTypes} from '../../store/offers/offers.selector';
import {changeLocation, changeSortType} from '../../store/offers/offers.slice';

const HomePage = () => {
  const [sortOpened, setSortOpened] = useState(false);
  const [currentCard, setCurrentCard] = useState('');
  const offers = useAppSelector(selectOffers);
  const sortType = useAppSelector(selectSortTypes);
  const location = useAppSelector(selectLocation);
  const dispatch = useAppDispatch();

  const handlePlaceCardMouseOver = (evt: MouseEvent) => {
    const {cardId} = (evt.target as HTMLElement).dataset;

    if (cardId) {
      setCurrentCard(cardId);
    }
  };

  return (
    <Layout mainClassName={classNames({
      'page__main page__main--index page__main--index-empty': !offers.length
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
          {'cities__places-container--empty': !offers.length},
          'container')}
        >
          <section className={classNames({
            'cities__places places': offers.length,
            'cities__no-places': !offers.length
          })}
          >
            {offers.length ?
              <>
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {location}</b>
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
                  offers={offers}
                  onMouseOver={handlePlaceCardMouseOver}
                />
              </> :
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
              </div>}
          </section>
          <div className="cities__right-section">
            {offers.length &&
            <section className="cities__map map">
              <Map offers={offers} currentCard={currentCard} />
            </section>}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
