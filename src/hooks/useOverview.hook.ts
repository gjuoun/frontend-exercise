
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

import { RawTeam, Team, User } from "@type/team.type";
import { updateTeams as updateTeamsAction } from "@redux/team/team.action";


const useOverview = () => {
  const dispatch = useDispatch()

  const teamMap = useSelector((state) => state.teamState.teamMap)

  const rawTeams = useMemo(() => {
    return Array.from(Object.values(teamMap)) as RawTeam[]
  }, [teamMap])

  const { isLoading: rawTeamsLoading } = useQuery("/teams", () => getAllTeams(), {
    onSuccess: (teams) => {
      updateTeams(teams)
    },
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });

  const updateTeams = useCallback((teams: RawTeam[]) => {
    dispatch(updateTeamsAction(teams))
  }, [dispatch]
  )

  return {
    rawTeams,
    rawTeamsLoading
  }
}

export default useOverview