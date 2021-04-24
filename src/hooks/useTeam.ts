
import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  getTeam,
  getAllUsers,
  getAllTeams,
  getManyUsers,
} from "@services/api.service";

import { Team, User } from "@type/team.type";
import { updateMembers as updateMembersAction } from "@redux/team/team.action";


const useTeam = (teamId: string) => {

  const [toggleMembers, setToggleMembers] = useState(false)

  const dispatch = useDispatch()

  const teamMap = useSelector((state) => state.teamState.teamMap)

  const updatedTeam = useMemo(() => {
    return teamMap[teamId] as Team
  }, [teamMap, teamId])

  const { data: teamDetails, isLoading: teamLoading } = useQuery(["/teams", teamId],
    () => getTeam(teamId), {
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });

  const { data, isLoading: membersLoading } = useQuery(["/users", teamId],
    () => {
      console.log("start query members");
      
      return getManyUsers(teamDetails!.teamMemberIds)
    },
    {
      enabled: !!teamDetails && toggleMembers,
      onSuccess: (users) => {
        updateMembers(teamId, users)
      }
    }
  )

  const updateMembers = useCallback((teamId: string, members: User[]) => {
    dispatch(updateMembersAction(teamId, members))
  }, [dispatch])

  return {
    updatedTeam,
    teamLoading,
    membersLoading,
    toggleMembers,
    setToggleMembers
  }
}

export default useTeam