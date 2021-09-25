import { Redirect, Switch } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import { Route } from "react-router-dom";

export default function Routes() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/auth/login" exact component={Login} />
      <Redirect exact from="/" to="/dashboard" />
    </Switch>
  );
}
