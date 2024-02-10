import {useState} from 'react';
import {CITIES, OPTIONS} from '../../const';
import Location from '../../components/location/location';
import PlacesOption from '../../components/places-option/places-option';
import PlaceCard from '../../components/place-card/place-card';

type HomePageProps = {
  placeCount: number;
};

const HomePage = ({placeCount}: HomePageProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checkedFilter, setCheckedFilter] = useState<null | number>(null);
  const [checkedOption, setCheckedOption] = useState<null | number>(null);
  const sortClickHandler = () => setIsOpen(() => !isOpen);
  const filterClickHandler = (id: number) => setCheckedFilter(id);
  const optionClickHandler = (id: number) => setCheckedOption(id);
  const optionsOpen = isOpen ? 'places__options--opened' : '';

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {CITIES.map((city) => (
              <Location
                key={city.id}
                city={city}
                isActive={checkedFilter === city.id}
                onClick={filterClickHandler}
              />
            ))}
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{placeCount} places to stay in Amsterdam</b>
            <form className="places__sorting" action="#" method="get" onClick={sortClickHandler}>
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width={7} height={4}>
                  <use xlinkHref="#icon-arrow-select" />
                </svg>
              </span>
              <ul className={`places__options places__options--custom ${optionsOpen}`}>
                {OPTIONS.map((option) => (
                  <PlacesOption
                    key={option.id}
                    option={option}
                    isActive={checkedOption === option.id}
                    onClick={optionClickHandler}
                  />
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
    </>
  );
};

export default HomePage;
