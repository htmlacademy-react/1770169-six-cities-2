import {LocationName, Locations} from '../../types/app-type';
import Location from '../location/location';

type LocationListProps = {
  locations: Locations;
  selectedLocation: LocationName;
  onLocationClick: (location: LocationName) => void;
};

const LocationList = ({locations, selectedLocation, onLocationClick}: LocationListProps) => (
  <ul className="locations__list tabs__list" data-testid="locations-list">
    {locations.map(({id, name}) => (
      <Location
        key={id}
        location={name}
        selectedLocation={selectedLocation}
        onLocationClick={onLocationClick}
      />))}
  </ul>
);

export default LocationList;
