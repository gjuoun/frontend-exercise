
import React, { useEffect, useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  getManyUsers,
} from "@services/api.service";

import { Team, User } from "@type/team.type";
import { updateMembers as updateMembersAction } from "@redux/team/team.action";


const useMembers = (teamId: string, memberIds: string[]) => {
  const dispatch = useDispatch()
  const teamMap = useSelector((state) => state.teamState.teamMap)

  const members = useMemo(() => {
    const team = teamMap[teamId] as Team
    return team.members
  }, [teamMap, teamId])

  const { isLoading: membersLoading, } = useQuery(teamId,
    () => getManyUsers(memberIds!), {
    onSuccess: (users) => {
      updateMembers(teamId, users)
    },
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });

  const updateMembers = useCallback((teamId: string, members: User[]) => {
    dispatch(updateMembersAction(teamId, members))
  }, [dispatch])

  return {
    members,
    membersLoading,
  }
}

export default useMembers