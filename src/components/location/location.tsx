import {Link} from 'react-router-dom';

type LocationProps = {
  name: string;
  isActive: boolean;
  onClick: (name: string) => void;
};

const Location = ({name, isActive, onClick}: LocationProps): JSX.Element => (
  <li className="locations__item">
    <Link
      className={
        isActive ?
          'locations__item-link tabs__item tabs__item--active' :
          'locations__item-link tabs__item'
      }
      to="#"
      onClick={() => onClick(name)}
    >
      <span>{name}</span>
    </Link>
  </li>
);


export default Location;
