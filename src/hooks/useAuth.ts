import { RootState } from './../store/index';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../services/api';
import { AuthState, login, logout } from '../store/auth.store';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth);

  if (user.token && !user.user) {
    api
      .get('/profile')
      .then(response => {
        dispatch(
          login({
            token: user.token,
            user: response.data,
          }),
        );
      })
      .catch(() => {
        dispatch(logout());
      });
  }

  return useMemo<AuthState>((): AuthState => user, [user]);
};
