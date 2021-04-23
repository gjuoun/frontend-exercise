import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Team from "./Team/Team";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Team />
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
    </Router>
  );
}
