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


interface Props {
  teamId: string;
}

const TeamPreview = ({ teamId }: Props) => {
  const {
    teamDetails,
    teamLead,
    members,
    membersLoading,
    teamLeadLoading,
    teamLoading,
  } = useTeamPreview(teamId);

  if (membersLoading || teamLoading || teamLeadLoading) {
    return <Spinner height="10rem"></Spinner>;
  } else {
    return (
      <TeamDetailsRow>
        <Member member={teamLead} role="Team Lead"></Member>
        {members?.map((member) => {
          return <Member member={member} role="Member"></Member>;
        })}
      </TeamDetailsRow>
    );
  }
};

const TeamDetailsRow = styled(Row)`
  padding: 1rem;
`;


export default TeamPreview;