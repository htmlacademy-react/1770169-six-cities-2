type PlacesOptionProps = {
  name: string;
  isActive: boolean;
  onClick: (id: string) => void;
};

const PlacesOption = ({name, isActive, onClick}: PlacesOptionProps): JSX.Element => (
  <li
    className={
      isActive ?
        'places__option places__option--active' :
        'places__option'
    }
    tabIndex={0}
    onClick={() => onClick(name)}
  >
    {name}
  </li>
);

export default PlacesOption;
