import { Redirect, Switch } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import { Route } from "react-router-dom";

export default function Routes() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/auth/login" exact component={Login} />
      <Route path="/auth/register" exact component={Register} />
      <Redirect exact from="/" to="/dashboard" />
    </Switch>
  );
}
