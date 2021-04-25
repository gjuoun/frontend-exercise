import React from "react";
import { Col, Row, Spinner as SpinnerBase } from "react-bootstrap";
import styled from "styled-components/macro";

interface Props {
  height?: string;
}

const Spinner = ({ height = "" }: Props) => {
  return (
    <SpinnerContainer height={height}>
      <SpinnerBase animation="border" variant="primary"></SpinnerBase>
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.div<{ height: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(props) => (props.height ? props.height : `50vh`)};
`;

export default Spinner;
