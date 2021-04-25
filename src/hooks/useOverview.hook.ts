
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTeams,
} from "@services/api.service";

import { RawTeam } from "@type/team.type";
import { updateTeams as updateTeamsAction } from "@redux/team/team.action";


const useOverview = () => {
  const dispatch = useDispatch()

  const [pageLimit, setPageLimit] = useState(10)
  const [pageNum, setPageNum] = useState(1)

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
    rawTeamsLoading,
    pageNum,
    setPageNum,
    pageLimit,
    setPageLimit,
  }
}

export default useOverview