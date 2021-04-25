import  { useCallback, useMemo} from "react";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  getTeam,
  getManyUsers,
} from "@services/api.service";

import { Team, User } from "@type/team.type";
import {
  updateMembers as updateMembersAction,
  updateTeamDetails as updateTeamDetailsAction,
  updateTeamLead as updateTeamLeadAction
} from "@redux/team/team.action";


const useTeamDetail = (teamId: string) => {


  const dispatch = useDispatch()

  const teamMap = useSelector((state) => state.teamState.teamMap)

  const updatedTeam = useMemo(() => {
    if (teamMap[teamId]) {
      return teamMap[teamId] as Team
    } else {
      return undefined
    }
  }, [teamMap, teamId])


  // step 1, get team details
  const { data: teamDetails, isLoading: teamLoading } = useQuery(["teams", teamId],
    () => getTeam(teamId), {
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    onSuccess: (team) => {
      if (team) {
        updateTeamDetails(team)
      }
    }
  });

  // step 2. get team lead 
  const { isLoading: teamLeadLoading } = useQuery(["teamLead", teamId],
    () => {
      return getUser(teamDetails!.teamLeadId)
    },
    {
      enabled: !!teamDetails,
      onSuccess: (teamLead) => {
        if (teamLead) {
          // set role
          updateTeamLead(teamId, { ...teamLead, role: "Team Lead" })
        }

      },
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )

  // step 2. get members details when toggled 
  const {  isLoading: membersLoading } = useQuery(["members", teamId],
    () => {
      return getManyUsers(teamDetails!.teamMemberIds)
    },
    {
      enabled: !!teamDetails,
      onSuccess: (users) => {
        if (users) {
          // set role
          const formattedUsers = users.map((user) => ({ ...user, role: "Member" }))
          updateMembers(teamId, formattedUsers)
        }
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
  }
}

export default useTeamDetail