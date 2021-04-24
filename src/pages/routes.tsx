import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
} from "react-router-dom";
import Overview from "./Overview/Overview";
import TeamDetail from "./Team/TeamDetail";


export default function Routes() {
  const queryParams = new URLSearchParams(window.location.search);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Overview />
        </Route>
        <Route path="/team">
          <TeamDetail
            teamId={
              // `7676a4bf-adfe-415c-941b-1739af07039b`
              queryParams.get("teamId") ?? ""
            }
          />
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
    </Router>
  );
}
