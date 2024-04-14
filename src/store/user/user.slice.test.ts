import {AuthorizationStatus} from '../../const';
import {getMockUser} from '../../utils/mock-utils';
import {authAction, checkAuthAction, logoutAction} from '../api-actions';
import {userSlice} from './user.slice';

describe('User slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };
    const result = userSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };
    const result = userSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "Auth", set "user" to user with "authAction.fulfilled"', () => {
    const user = getMockUser();
    const data = {
      email: '',
      password: ''
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user
    };
    const result = userSlice.reducer(undefined, authAction.fulfilled(user, '', data));
    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "NoAuth" with "authAction.rejected"', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
    };
    const result = userSlice.reducer(undefined, authAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "Auth", set "user" to user with "checkAuthAction.fulfilled"', () => {
    const user = getMockUser();
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user
    };
    const result = userSlice.reducer(undefined, checkAuthAction.fulfilled(user, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "NoAuth" with "checkAuthAction.rejected"', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
    };
    const result = userSlice.reducer(undefined, checkAuthAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "NoAuth", set "user" to null with "logoutAction.fulfilled"', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
    };
    const result = userSlice.reducer(undefined, logoutAction.fulfilled);
    expect(result).toEqual(expectedState);
  });
});
