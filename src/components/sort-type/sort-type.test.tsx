import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SortType from './sort-type';
import {SORT_TYPES} from '../../const';

describe('Component: SortType', () => {
  const sortType = SORT_TYPES[0].name;
  const handleSortTypeClick = vi.fn();

  it('should render SortType component', () => {
    render(
      <SortType
        sortType={sortType}
        selectedSortType={sortType}
        onSortTypeClick={handleSortTypeClick}
      />
    );

    expect(screen.getByText(sortType)).toBeInTheDocument();
  });

  it('should onClick called, when user choose locations', async() => {
    render(
      <SortType
        sortType={sortType}
        selectedSortType={sortType}
        onSortTypeClick={handleSortTypeClick}
      />
    );

    await userEvent.click(screen.getByText(sortType));

    expect(handleSortTypeClick).toBeCalled();
    expect(handleSortTypeClick).nthCalledWith(1, sortType);
  });
});
