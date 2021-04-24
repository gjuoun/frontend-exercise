import { Team, User } from "@type/team.type";
import React from "react";

interface Props {
  children?: React.ReactNode;
  teamId: string;
  memberIds: string[];
}

const Member = ({ teamId, memberIds }: Props) => {
  // if (membersLoading) {
  //   return <p>Member is loading</p>;
  // } else if (members) {
  //   return (
  //     <>
  //       {members.map((member) => {
  //         return (
  //           <div key={member.id}>
  //             <p>
  //               {member.firstName} - {member.lastName}
  //             </p>
  //           </div>
  //         );
  //       })}
  //     </>
  //   );
  // } else {
  //   return <></>;
  // }
  return <></>;
};

export default Member;
