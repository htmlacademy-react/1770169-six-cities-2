import {render, screen} from '@testing-library/react';

import Layout from './layout';
import {withHistory, withStore} from '../../utils/mock-component-utils';
import {getMockStore} from '../../utils/mock-utils';


describe('Component: Layout', () => {
  it('should render Layout component', () => {
    const withHistoryComponent = withHistory(<Layout />);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore());

    render(withStoreComponent);


    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('should render nested component in the Layout component', () => {
    const withHistoryComponent = withHistory(
      <Layout>
        <span>Nested component</span>
      </Layout>
    );
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore());

    render(withStoreComponent);


    expect(screen.getByText('Nested component')).toBeInTheDocument();
  });
});
