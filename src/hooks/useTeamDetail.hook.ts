
import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useQuery, useQueries } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  getTeam,
  getAllUsers,
  getAllTeams,
  getManyUsers,
} from "@services/api.service";

import { Team, User } from "@type/team.type";
import {
  updateMembers as updateMembersAction,
  updateTeamDetails as updateTeamDetailsAction,
  updateTeamLead as updateTeamLeadAction
} from "@redux/team/team.action";


const useTeamDetail = (teamId: string) => {

  const [toggleMembers, setToggleMembers] = useState(false)

  const dispatch = useDispatch()

  const teamMap = useSelector((state) => state.teamState.teamMap)

  const updatedTeam = useMemo(() => {
    return teamMap[teamId] as Team
  }, [teamMap, teamId])


  // step 1, get team details
  const { data: teamDetails, isLoading: teamLoading } = useQuery(["teams", teamId],
    () => getTeam(teamId), {
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    onSuccess: (team) => {
      if (team) updateTeamDetails(team)
    }
  });

  // step 2. get team lead 
  const { data: teamLead, isLoading: teamLeadLoading } = useQuery(["teamLead", teamId],
    () => {
      return getUser(teamDetails!.teamLeadId)
    },
    {
      enabled: !!teamDetails,
      onSuccess: (teamLead) => {
        if (teamLead) updateTeamLead(teamId, teamLead)
      },
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )

  // step 2. get members details when toggled 
  const { data, isLoading: membersLoading } = useQuery(["members", teamId],
    () => {
      return getManyUsers(teamDetails!.teamMemberIds)
    },
    {
      enabled: !!teamDetails && toggleMembers,
      onSuccess: (users) => {
        updateMembers(teamId, users)
      },
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )



  // util functions
  const updateMembers = useCallback((teamId: string, members: User[]) => {
    dispatch(updateMembersAction(teamId, members))
  }, [dispatch])

  const updateTeamLead = useCallback((teamId: string, teamLead: User) => {
    dispatch(updateTeamLeadAction(teamId, teamLead))
  }, [dispatch])

  const updateTeamDetails = useCallback((team: Team) => {
    dispatch(updateTeamDetailsAction(team))
  }, [dispatch])

  return {
    updatedTeam,
    teamLoading,
    teamLeadLoading,
    membersLoading,
    toggleMembers,
    setToggleMembers
  }
}

export default useTeamDetail