
import React, { useEffect, useCallback, useMemo } from "react";
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
import { updateTeams as updateTeamsAction} from "@redux/team/team.action";


const useTeams = () => {
  const dispatch = useDispatch()

  const teamMap = useSelector((state) => state.teamState.teamMap)

  const teams = useMemo(() => {
    return Array.from(Object.values(teamMap))
  }, [teamMap])

  const { isLoading: teamsLoading } = useQuery("/teams", () => getAllTeams(), {
    onSuccess: (teams) => {
      updateTeams(teams)
    },
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });

  const updateTeams = useCallback((teams: Team[]) => {
    dispatch(updateTeamsAction(teams))
  }, [dispatch]
  )

  return {
    teams,
    teamsLoading
  }
}

export default useTeams