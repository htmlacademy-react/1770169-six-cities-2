import classNames from 'classnames';
import {Link} from 'react-router-dom';

import {LocationName} from '../../types/app-type';

type LocationProps = {
  location: LocationName;
  selectedLocation: LocationName;
  onLocationClick: (location: LocationName) => void;
};

const Location = ({location, selectedLocation, onLocationClick}: LocationProps) => (
  <li className="locations__item">
    <Link
      className={classNames({
        'locations__item-link tabs__item tabs__item--active': selectedLocation === location,
        'locations__item-link tabs__item': selectedLocation !== location
      })}
      to="#"
      onClick={() => onLocationClick(location)}
    >
      <span>{location}</span>
    </Link>
  </li>
);

export default Location;
