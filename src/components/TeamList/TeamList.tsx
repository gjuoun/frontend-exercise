import React from "react";
import { RawTeam } from "@type/team.type";
import { Link,  useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { ListGroup } from "react-bootstrap";

interface Props {
  rawTeams: RawTeam[];
}

const TeamList = ({ rawTeams }: Props) => {
  let history = useHistory();

  const renderTeams = (teams: RawTeam[]) => {
    return teams.map((team) => {
      return (
        <ListGroup.Item
          key={team.id}
          action
          onClick={() => {
            history.push(`/team/${team.id}`)
          }}
        >
          <Link to={`/team/${team.id}`}>{team.name}</Link>
        </ListGroup.Item>
      );
    });
  };

  return <TeamsListGroup>{renderTeams(rawTeams)}</TeamsListGroup>;
};

export default TeamList;

const TeamsListGroup = styled(ListGroup)`
  margin-top: 1rem;
`;
