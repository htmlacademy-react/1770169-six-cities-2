import {render, screen} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import LoginPage from './login-page';
import {withHistory, withStore} from '../../utils/mock-component-utils';
import {getMockStore} from '../../utils/mock-utils';

describe('Page: LoginPage', () => {
  it('should render login page', () => {
    const withHistoryComponent = withHistory(<LoginPage />);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore());

    render(withStoreComponent);

    expect(screen.getAllByText(/Sign in/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render correctly login page, when enter email and password', async() => {
    const withHistoryComponent = withHistory(<LoginPage />);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore());
    const email = 'test@mail.ru';
    const password = '123test';

    render(withStoreComponent);

    await userEvent.type(screen.getByTestId('email-field'), email);
    await userEvent.type(screen.getByTestId('password-field'), password);

    expect(screen.getByDisplayValue(email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(password)).toBeInTheDocument();
  });
});
