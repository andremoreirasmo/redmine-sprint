import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

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
              pathname: "/auth/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}
