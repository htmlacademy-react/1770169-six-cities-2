import {AuthorizationStatus, NameSpace} from '../../const';
import {getMockUser} from '../../utils/mock-utils';
import {selectAuthorizationStatus, selectUser} from './user.selector';

describe('User selectors', () => {
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: getMockUser(),
    }
  };

  it('should return user from state', () => {
    const {user} = state[NameSpace.User];
    const result = selectUser(state);

    expect(result).toMatchObject(user);
  });

  it('should return authorization status from state', () => {
    const {authorizationStatus} = state[NameSpace.User];

    const result = selectAuthorizationStatus(state);

    expect(result).toBe(authorizationStatus);
  });
});
