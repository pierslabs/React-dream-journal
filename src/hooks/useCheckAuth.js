import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseAuth } from '../firebase';
import { login, logout } from '../store/Auth';
import { startLoadingNotes } from '../store/journal/thunks';

const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());

      const { displayName, email, photoURL, uid } = user;

      dispatch(login({ displayName, email, photoURL, uid }));
      dispatch(startLoadingNotes());
    });
  }, []);
  return { status };
};

export default useCheckAuth;
