import React, { useEffect } from "react";
import useTeams from "@hooks/useTeams";

interface Props {
  children?: React.ReactNode;
}

const Team = (props: Props) => {
  const { teams, teamsLoading } = useTeams();

  if (teamsLoading) {
    return <></>;
  } else {
    return <>
    {teams.map((team) => {
      return <p key={team.name}>{team.name}</p>;
    })}
    </>
  }
};

export default Team;
