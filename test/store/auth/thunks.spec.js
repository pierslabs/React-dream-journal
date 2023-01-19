import {
  LoginUserEmailPassword,
  singInWithGoogle,
  UserLogOutFirebase,
} from '../../../src/firebase';
import {
  checkingCredentials,
  login,
  logout,
} from '../../../src/store/Auth/authSlice';
import {
  checkingAuthentication,
  startFirebaseLogOut,
  startGoogleSignIn,
  startLoginUSerWithEmailPassword,
} from '../../../src/store/Auth/thunks';
import { clearNotesLogut } from '../../../src/store/journal';
import { demoUser } from '../../fixures/authFixures';

jest.mock('../../../src/firebase/providers');

describe('Auth/thunk', () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('should invoke checkingAuth ', async () => {
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(checkingCredentials());
  });

  test('should startGoogleSignIn call checkingCredentials && Login ', async () => {
    const loginData = { ok: true, ...demoUser };
    await singInWithGoogle.mockResolvedValue(loginData);

    //thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('should startGoogleSignIn call checkingCredentials with Errors && logout ', async () => {
    const loginData = { ok: false, errorMessage: 'Error....' };
    await singInWithGoogle.mockResolvedValue(loginData);

    //thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test('should startLoginUSerWithEmailPassword call checkingCredentials', async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456' };

    await LoginUserEmailPassword.mockResolvedValue(loginData);
    await startLoginUSerWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(demoUser));
  });

  test('should startFirebaseLogOut call UserLogOutFirebase', async () => {
    await startFirebaseLogOut()(dispatch);

    expect(UserLogOutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogut());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
