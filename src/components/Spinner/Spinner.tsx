import React from "react";
import { Col, Row, Spinner as SpinnerBase } from "react-bootstrap";
import styled from "styled-components/macro";

const Spinner = () => {
  return (
    <SpinnerContainer>
      <SpinnerBase animation="border" variant="primary"></SpinnerBase>
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 300px);
`;

export default Spinner;
