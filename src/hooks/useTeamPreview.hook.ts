import React from "react";
import { useQuery } from "react-query";
import {
  getUser,
  getTeam,
  getManyUsers,
} from "@services/api.service";

const useTeamPreview = (teamId: string) => {

  // step 1, get team details
  const { data: teamDetails, isLoading: teamLoading } = useQuery(["teams", teamId],
    () => getTeam(teamId), {
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });

  // step 2. get team lead 
  const { data: teamLead, isLoading: teamLeadLoading } = useQuery(["teamLead", teamId],
    () => {
      return getUser(teamDetails!.teamLeadId)
    },
    {
      enabled: !!teamDetails,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )

  // step 2. get members details when toggled 
  const { data: members, isLoading: membersLoading } = useQuery(["members", teamId],
    () => {
      return getManyUsers(teamDetails!.teamMemberIds)
    },
    {
      enabled: !!teamDetails,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )


  return {
    teamDetails,
    teamLead,
    members,
    teamLoading,
    membersLoading,
    teamLeadLoading
  }
}

export default useTeamPreview