import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <p>haha</p>
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
    </Router>
  );
}
