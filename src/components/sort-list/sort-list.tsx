import classNames from 'classnames';

import {SortTypeName, SortTypes} from '../../types/app-type';
import SortType from '../sort-type/sort-type';

type SortListProps = {
  sortTypeList: SortTypes;
  sortOpened: boolean;
  selectedSortType: SortTypeName;
  onSortTypeClick: (sortType: SortTypeName) => void;
};

const SortList = ({sortTypeList, sortOpened, selectedSortType, onSortTypeClick}: SortListProps) => (
  <ul
    className={classNames(
      'places__options places__options--custom',
      {'places__options--opened': sortOpened}
    )}
    data-testid="sort-list"
  >
    {sortTypeList.map(({id, name}) => (
      <SortType
        key={id}
        sortType={name}
        selectedSortType={selectedSortType}
        onSortTypeClick={onSortTypeClick}
      />))}
  </ul>
);

export default SortList;
