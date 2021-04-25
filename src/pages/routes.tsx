import PublicRoute from "@components/Route/PublicRoute";
import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Overview from "./Overview/Overview";
import Team from "./Team/Team";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/" exact>
          <Overview />
        </PublicRoute>
        <PublicRoute path="/team/:teamId">
          <Team />
        </PublicRoute>
        <Redirect to="/"></Redirect>
      </Switch>
    </Router>
  );
}
