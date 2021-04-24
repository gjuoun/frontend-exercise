import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Teams from "./Overview/Overview";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Teams />
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
    </Router>
  );
}
