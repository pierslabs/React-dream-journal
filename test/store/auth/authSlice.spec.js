import { CollectionsOutlined } from '@mui/icons-material';
import { authSlice, login, logout } from '../../../src/store/Auth/authSlice';
import {
  authenticatedState,
  demoUser,
  initialState,
  notAuthenticatedState,
} from '../../fixures/authFixures';

describe('AuthSlice', () => {
  test('should return initial state ', () => {
    const status = authSlice.reducer(initialState, {});
    expect(authSlice.name).toBe('auth');
    expect(status).toEqual(initialState);
  });

  test('should return authenticatedState when pass Login ', () => {
    const action = login(demoUser);

    const status = authSlice.reducer(initialState, action);

    expect(authSlice.name).toBe('auth');
    expect(status).toEqual({
      status: 'authenticated',
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  test('should return initialState when Logout with errorMessage', () => {
    const errorMessage = 'Not valid credentials..';
    const status = authSlice.reducer(initialState, logout({ errorMessage }));
    expect(authSlice.name).toBe('auth');
    expect(status).toEqual({ ...notAuthenticatedState, errorMessage });
  });

  test('should return initialState when Logout withOut errorMessage', () => {
    const status = authSlice.reducer(initialState, logout());
    expect(authSlice.name).toBe('auth');
    expect(status).toEqual({
      ...notAuthenticatedState,
      errorMessage: undefined,
    });
  });
});
