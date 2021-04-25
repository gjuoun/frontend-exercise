import { Team } from "@type/team.type";
import { Link, useLocation } from "react-router-dom";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useState } from "react";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import styled from "styled-components/macro";

interface Props {
  team: Team;
}

const TeamListItem = ({ team }: Props) => {
  const [toggleDetails, setToggleDetails] = useState(false);

  return (
    <ListGroup.Item
      key={team.id}
      action
      onClick={() => setToggleDetails((prev) => !prev)}
    >
      <Row>
        <Col>
          <Link to={`/team/${team.id}`}>{team.name}</Link>
        </Col>
        <Col sm={4} className="d-flex justify-content-end">
          <span>{team.teamMemberIds.length} Members</span>
          <Icon>{toggleDetails ? <FiChevronsUp /> : <FiChevronsDown />}</Icon>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

const Icon = styled.span`
  padding-left: 1rem;
  & > svg {
    width: 1rem;
  }
`;

export default TeamListItem;
