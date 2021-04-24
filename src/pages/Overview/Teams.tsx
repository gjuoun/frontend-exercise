import React, { useEffect, useState } from "react";
import { RawTeam, Team as TeamIntf, User } from "@type/team.type";
import useTeams from "@hooks/useTeams.hook";
import TeamDetail from "../Team/TeamDetail";
import { Link, useLocation } from "react-router-dom";

const Teams = ({ rawTeams }: { rawTeams: RawTeam[] }) => {
  const { teams, teamsLoading } = useTeams(rawTeams);

  const renderTeams = (teams: TeamIntf[]) => {
    return teams.map((team) => {
      return (
        <li>
          <Link to={`/team?teamId=${team.id}`}>{team.name}</Link>
        </li>
      );
    });
  };

  if (teamsLoading) {
    return <></>;
  } else if (teams) {
    return <ul>{renderTeams(teams)}</ul>;
  } else {
    return <></>;
  }
};

export default Teams;
