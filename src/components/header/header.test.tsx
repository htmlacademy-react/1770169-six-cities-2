import {render, screen} from '@testing-library/react';

import Header from './header';
import {withStore, withHistory} from '../../utils/mock-component-utils';
import {getMockStore} from '../../utils/mock-utils';
import {AuthorizationStatus} from '../../const';

describe('Component: Header', () => {
  it('should render Header component, when user authorized', () => {
    const withHistoryComponent = withHistory(<Header />);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore({
      USER: {user: null, authorizationStatus: AuthorizationStatus.Auth}
    }));

    render(withStoreComponent);

    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should render Header component, when user not authorized', () => {
    const withHistoryComponent = withHistory(<Header />);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore());

    render(withStoreComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
