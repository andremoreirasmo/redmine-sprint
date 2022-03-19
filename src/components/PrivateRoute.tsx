import { useAuth } from '@/shared/hooks/useAuth';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export default function PrivateRoute({ children, ...rest }: RouteProps) {
  const userAuth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return userAuth.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}
