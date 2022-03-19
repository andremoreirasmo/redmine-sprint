import getApi from '@/shared/providers/api';
import { AuthState, login, logout } from '@/store/auth.store';
import { RootState } from '@/store/index';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const api = getApi();

  if (auth.token && !auth.user) {
    api
      .get('/profile')
      .then(response => {
        dispatch(
          login({
            token: auth.token,
            user: response.data,
          }),
        );
      })
      .catch(() => {
        dispatch(logout());
      });
  }

  return useMemo<AuthState>((): AuthState => auth, [auth]);
};
