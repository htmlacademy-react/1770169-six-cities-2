import classNames from 'classnames';

import {SortTypeName} from '../../types/app-type';

type SortTypeProps = {
  sortType: SortTypeName;
  selectedSortType: SortTypeName;
  onSortTypeClick: (sortType: SortTypeName) => void;
};

const SortType = ({sortType, selectedSortType, onSortTypeClick}: SortTypeProps) => (
  <li
    className={classNames({
      'places__option places__option--active': selectedSortType === sortType,
      'places__option': selectedSortType !== sortType
    })}
    tabIndex={0}
    onClick={() => onSortTypeClick(sortType)}
  >
    {sortType}
  </li>
);

export default SortType;
