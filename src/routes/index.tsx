import { Redirect, Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "../pages/dashboard";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Forgot from "../pages/auth/forgot";

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute path="/dashboard">
        <Dashboard />
      </PrivateRoute>
      <Route path="/auth/login" exact component={Login} />
      <Route path="/auth/register" exact component={Register} />
      <Route path="/auth/forgot" exact component={Forgot} />
      <Redirect exact from="/" to="/dashboard" />
    </Switch>
  );
}
