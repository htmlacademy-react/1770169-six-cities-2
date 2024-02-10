import {Link} from 'react-router-dom';

type City = {
  id: number;
  name: string;
};

type LocationProps = {
  city: City;
  isActive: boolean;
  onClick: (id: number) => void;
};

const Location = ({city, isActive, onClick}: LocationProps): JSX.Element => {
  const {id, name} = city;

  return (
    <li className="locations__item">
      <Link
        className={
          isActive ?
            'locations__item-link tabs__item tabs__item--active' :
            'locations__item-link tabs__item'
        }
        to="#"
        onClick={() => onClick(id)}
      >
        <span>{name}</span>
      </Link>
    </li>
  );
};


export default Location;
