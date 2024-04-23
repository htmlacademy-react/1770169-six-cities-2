import {render, screen} from '@testing-library/react';

import SortList from './sort-list';
import {SORT_TYPES} from '../../const';


describe('Component: SortList', () => {
  it('should render SortList component', () => {
    render(
      <SortList
        sortTypeList={SORT_TYPES}
        sortOpened
        selectedSortType={SORT_TYPES[0].name}
        onSortTypeClick={vi.fn()}
      />
    );

    expect(screen.getByTestId('sort-list')).toBeInTheDocument();
  });
});
