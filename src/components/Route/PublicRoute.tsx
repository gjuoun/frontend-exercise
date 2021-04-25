import Navigation from "@components/Navigation/Navigation";
import React from "react";
import { Route } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
}

export default function PublicRoute({ children, path, exact = false }: Props) {
  return (
    <Route path={path} exact={exact}>
      <Navigation></Navigation>
      {children}
    </Route>
  );
}
