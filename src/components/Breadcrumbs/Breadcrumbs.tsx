import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

const Breadcrumbs = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item active as={Link} to="#">
        Home
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default Breadcrumbs
