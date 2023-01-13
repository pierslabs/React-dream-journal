import { async } from '@firebase/util';
import {
  LoginUserEmailPassword,
  RegisterWithEmailPassword,
  singInWithGoogle,
  UserLogOutFirebase,
} from '../../firebase';
import { clearNotesLogut } from '../journal';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await singInWithGoogle();
    if (!result.ok) {
      return dispatch(logout(result.errorMessage));
    }

    dispatch(login(result));
  };
};

export const startRegisterUserEmailPassord = ({
  displayName,
  password,
  email,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } = await RegisterWithEmailPassword(
      {
        displayName,
        email,
        password,
      }
    );

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginUSerWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, errorMessage, uid, photoURL, displayName } =
      await LoginUserEmailPassword({
        email,
        password,
      });
    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startFirebaseLogOut = () => {
  return async (dispatch) => {
    await UserLogOutFirebase();
    dispatch(clearNotesLogut());
    dispatch(logout());
  };
};
