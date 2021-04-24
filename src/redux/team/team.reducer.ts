import { RawTeam, Team } from '@type/team.type'
import { TeamAction, TeamState, TEAM_ACTION } from './team.reduxType'

const initialState = (): TeamState => {
  return {
    teamMap: {}
  }
}


export default function TeamReducer(state = initialState(), action: TeamAction): TeamState {

  switch (action.type) {
    case TEAM_ACTION.UPDATE_TEAMS: {
      const newMap: Record<string, Team | RawTeam> = { ...state.teamMap }
      action.payload.forEach((team) => {
        newMap[team.id] = team
      })
      return { teamMap: newMap }
    }
    case TEAM_ACTION.UPDATE_MEMBERS: {
      const { teamId, members } = action.payload
      if (state.teamMap[teamId]) {
        const newMap: Record<string, Team | RawTeam> = { ...state.teamMap }
        const findTeam = newMap[teamId] as Team
        findTeam.members = members
        return { teamMap: newMap }
      } else {
        return { ...state }
      }
    }
    case TEAM_ACTION.UPDATE_TEAMLEAD: {
      const { teamId, teamLead } = action.payload
      if (state.teamMap[teamId]) {
        const newMap: Record<string, Team | RawTeam> = { ...state.teamMap }
        const findTeam = newMap[teamId] as Team
        findTeam.teamLead = teamLead
        return { teamMap: newMap }
      } else {
        return { ...state }
      }
    }
    default:
      return state
  }
}