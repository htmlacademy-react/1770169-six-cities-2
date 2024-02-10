type Option = {
  id: number;
  name: string;
};

type PlacesOptionProps = {
  option: Option;
  isActive: boolean;
  onClick: (id: number) => void;
};

const PlacesOption = ({option, isActive, onClick}: PlacesOptionProps): JSX.Element => {
  const {id, name} = option;

  return (
    <li
      className={
        isActive ?
          'places__option places__option--active' :
          'places__option'
      }
      tabIndex={0}
      onClick={() => onClick(id)}
    >
      {name}
    </li>
  );
};

export default PlacesOption;
