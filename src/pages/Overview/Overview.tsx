import React, { useEffect, useState } from "react";
import useOverview from "@hooks/useOverview";
import Member from "@components/Member/Members";
import { RawTeam, Team as TeamIntf } from "@type/team.type";
import useTeams from "@hooks/useTeams";
import useTeam from "@hooks/useTeam";

interface Props {
  children?: React.ReactNode;
}

const Team = ({ team }: { team: TeamIntf }) => {
  const {
    updatedTeam,
    teamLoading,
    membersLoading,
    setToggleMembers,
    toggleMembers,
  } = useTeam(team.id);

  if (teamLoading) {
    return <div>{updatedTeam.name}</div>;
  } else if (updatedTeam) {
    console.log(updatedTeam);

    return (
      <div>
        <p>{updatedTeam.name}</p>
        <button
          onClick={() => {
            setToggleMembers((prev) => !prev);
          }}
        >
          show member

        </button>
        {toggleMembers &&
          updatedTeam.members &&
          updatedTeam.members.map((member) => {
            return <div>{member.displayName}</div>;
          })}
      </div>
    );

    // return (
    //   <div>
    //     {updatedTeam.name} - member: {updatedTeam.teamMemberIds.length}
    //     <button
    //       type="button"
    //       onClick={() => {
    //         setToggleMembers((toggle) => !toggle);
    //       }}
    //     >
    //       see members
    //     </button>
    //     <div>members</div>
    //   </div>
    // );
    return <></>;
  } else {
    return <></>;
  }
};

const Teams = ({ rawTeams }: { rawTeams: RawTeam[] }) => {
  const { teams, teamsLoading } = useTeams(rawTeams);

  const renderTeams = (teams: TeamIntf[]) => {
    return <Team team={teams[0]}></Team>;
  };

  if (teamsLoading) {
    return <></>;
  } else if (teams) {
    return <div>{renderTeams(teams)}</div>;
  } else {
    return <></>;
  }
};

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
