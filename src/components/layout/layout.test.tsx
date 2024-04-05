import {render, screen} from '@testing-library/react';

import Layout from './layout';
import {withStore, withHistory} from '../../utils/mock-component-utils';
import {getMockStore} from '../../utils/mock-utils';


describe('Component: Layout', () => {
  it('should render Layout component', () => {
    const withHistoryComponent = withHistory(<Layout />);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore());

    render(withStoreComponent);

    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });
});
