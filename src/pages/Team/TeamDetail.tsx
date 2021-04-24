import React, { useEffect, useState } from "react";
import useTeamDetail from "@hooks/useTeamDetail.hook";

interface Props {
  teamId: string;
}

const TeamDetail = ({ teamId }: Props) => {
  const {
    updatedTeam,
    teamLoading,
    membersLoading,
    teamLeadLoading,
    setToggleMembers,
    toggleMembers,
  } = useTeamDetail(teamId);

  if (teamLoading) {
    return <div>{updatedTeam.name}</div>;
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

export default TeamDetail;
