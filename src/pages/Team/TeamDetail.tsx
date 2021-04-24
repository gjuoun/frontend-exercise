import React, { useEffect, useState } from "react";
import useTeamDetail from "@hooks/useTeamDetail.hook";
import { Redirect, useParams } from "react-router-dom";

interface Params {
  teamId: string;
}

const TeamDetail = () => {
  // getting teamId from `/team/:teamId`
  let { teamId } = useParams<Params>();

  const {
    updatedTeam,
    teamLoading,
    membersLoading,
    teamLeadLoading,
    setToggleMembers,
    toggleMembers,
  } = useTeamDetail(teamId);

  if (!teamId) {
    return <Redirect to={"/"}></Redirect>;
  } else if (teamLoading || membersLoading || teamLeadLoading) {
    return <div>Loading</div>;
  } else if (updatedTeam) {
    console.log(updatedTeam);

    return (
      <div>
        <p>
          {updatedTeam.name} -
          <span>Team Lead: {updatedTeam.teamLead?.displayName ?? ""}</span>
          <span>Members: [{updatedTeam.teamMemberIds?.length}]</span>
        </p>
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
  } else {
    return <>No team</>;
  }
};

export default TeamDetail;
