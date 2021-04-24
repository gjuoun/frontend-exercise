import React from "react";
import useOverview from "@hooks/useOverview.hook";
import { RawTeam } from "@type/team.type";
import Teams from "./Teams";

interface Props {
  children?: React.ReactNode;
}

const Overview = (props: Props) => {
  const { rawTeams, rawTeamsLoading } = useOverview();

  const renderRawTeams = (teams: RawTeam[]) => {
    const teamSlice = teams.slice(0, 20);
    return <Teams rawTeams={teamSlice}></Teams>;
  };

  if (rawTeamsLoading) {
    return <></>;
  } else {
    return <>{renderRawTeams(rawTeams)}</>;
  }
};

export default Overview;
