import React, { useEffect, useState } from "react";
import { RawTeam, Team as TeamIntf, User } from "@type/team.type";
import useTeams from "@hooks/useTeams.hook";
import Team from "../../pages/Team/Team";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components/macro";
import { Col, ListGroup, Row } from "react-bootstrap";
import Spinner from "@components/Spinner/Spinner";
import TeamListItem from "./TeamListItem";

interface Props {
  pageNum: number;
  rawTeams: RawTeam[];
}

const Teams = ({ rawTeams, pageNum }: Props) => {
  const { teams, teamsLoading, refetchTeams } = useTeams(rawTeams);

  useEffect(() => {
    // retetch teams if pageNum is changed
    refetchTeams();
  }, [pageNum, refetchTeams]);

  const renderTeams = (teams: TeamIntf[]) => {
    return teams.map((team) => {
      return <TeamListItem key={team.id} team={team} />;
    });
  };

  if (teamsLoading) {
    return <Spinner></Spinner>;
  } else if (teams) {
    return <TeamsListGroup>{renderTeams(teams)}</TeamsListGroup>;
  } else {
    return <></>;
  }
};

export default Teams;

const TeamsListGroup = styled(ListGroup)`
  margin-top: 1rem;
`;
