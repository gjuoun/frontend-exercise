import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import {
  getUser,
  getTeam,
  getAllUsers,
  getAllTeams,
  getManyUsers,
} from "@services/api.service";

import { Team as TeamIntf, User } from "@type/team.type";

interface Props {
  children?: React.ReactNode;
}

const Team = (props: Props) => {
  const teamState = useSelector((state) => state.teamState);

  const { data, isLoading, error } = useQuery("/users", () => getAllTeams());

  if (isLoading) {
    return <></>;
  } else {
    console.log(data);
    return <p>Team get</p>;
  }
};

export default Team;
