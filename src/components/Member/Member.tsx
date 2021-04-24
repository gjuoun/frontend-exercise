import { User } from "@type/team.type";
import React from "react";

interface Props {
  children?: React.ReactNode;
  teamId: string;
  member: User;
}

const Member = ({ teamId, member }: Props) => {
  return (
    <div>
      {teamId} - {member.firstName} - {member.lastName}
    </div>
  );
};

export default Member;
