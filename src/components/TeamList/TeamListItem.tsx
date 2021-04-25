import { Team, User } from "@type/team.type";
import { Link, useLocation } from "react-router-dom";
import { Button, Card, Col, ListGroup, Media, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import styled from "styled-components/macro";
import useTeamDetail from "@hooks/useTeamDetail.hook";
import Spinner from "@components/Spinner/Spinner";
import useTeamPreview from "@hooks/useTeamPreview.hook";
import Member from "@components/Team/Member";
import TeamDetails from "@components/Team/TeamDetails";

interface Props {
  team: Team;
}

const TeamListItem = ({ team }: Props) => {
  const [toggleDetails, setToggleDetails] = useState(false);

  const renderDetails = (toggleDetails: boolean) => {
    if (toggleDetails) {
      return <TeamDetails teamId={team.id}></TeamDetails>;
    } else {
      return <></>;
    }
  };

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
      <Row className="d-flex flex-column">{renderDetails(toggleDetails)}</Row>
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
