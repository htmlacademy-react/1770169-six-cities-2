import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from '@reduxjs/toolkit';

import {redirect} from './redirect';
import browserHistory from '../../browser-history';
import {AppRoute} from '../../const';
import {Store} from '../../types/store-type';
import {redirectToRoute} from '../action';

vi.mock('../../browser-history', () => ({
  default: {
    location: {pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<Store, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/login" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.LOGIN);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.LOGIN);
  });

  it('should not redirect to "/login" with empty action', () => {
    const emptyAction = {type: '', payload: AppRoute.LOGIN};
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.FAVORITES);
  });
});
