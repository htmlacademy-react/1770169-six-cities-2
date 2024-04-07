import {render, screen} from '@testing-library/react';

import {sortTypes} from '../../const';
import SortList from './sort-list';


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
