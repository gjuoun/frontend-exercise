
import React, { useEffect, useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  getTeam,
  getAllUsers,
  getAllTeams,
  getManyUsers,
  getManyTeams,
} from "@services/api.service";

import { RawTeam} from "@type/team.type";
import { updateTeams as updateTeamsAction } from "@redux/team/team.action";


const useTeams = (rawTeams: RawTeam[]) => {
  const dispatch = useDispatch()

  const teamIds = useMemo(() => {
    return rawTeams.map((team) => team.id)
  }, [rawTeams])

  const { data: teams, isLoading: teamsLoading } = useQuery("/teams", () => getManyTeams(teamIds), {
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
    teams,
    teamsLoading
  }
}

export default useTeams