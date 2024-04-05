import {Route, Routes} from 'react-router-dom';

import {render, screen} from '@testing-library/react';

import {MemoryHistory, createMemoryHistory} from 'history';

import {AppRoute, AuthorizationStatus} from '../../const';
import {withHistory} from '../../utils/mock-component-utils';
import PrivateRoute from './private-route';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.FAVORITES);
  });

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={AppRoute.HOME} element={<span>{expectedText}</span>} />
        <Route path={AppRoute.FAVORITES} element={
          <PrivateRoute authorizationStatus={false} appRoute={'/favorites'}>
            <span>{notExpectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );

    render(withHistoryComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={AppRoute.HOME} element={<span>{notExpectedText}</span>} />
        <Route path={AppRoute.FAVORITES} element={
          <PrivateRoute authorizationStatus={!AuthorizationStatus.Auth} appRoute={'/favorites'}>
            <span>{expectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );

    render(withHistoryComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
