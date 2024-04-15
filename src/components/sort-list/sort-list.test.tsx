import {render, screen} from '@testing-library/react';

import SortList from './sort-list';
import {sortTypes} from '../../const';


describe('Component: SortList', () => {
  it('should render SortList component', () => {
    render(
      <SortList
        sortTypeList={sortTypes}
        sortOpened
        selectedSortType={sortTypes[0].name}
        onSortTypeClick={vi.fn()}
      />
    );

    expect(screen.getByTestId('sort-list')).toBeInTheDocument();
  });
});
