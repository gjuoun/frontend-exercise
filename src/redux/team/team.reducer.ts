import { Team } from '@type/team.type'
import { TeamAction, TeamState, TEAM_ACTION } from './team.reduxType'

const initialState = (): TeamState => {
  return {
    teamMap: new Map()
  }
}


export default function TeamReducer({ teamMap } = initialState(), action: TeamAction): TeamState {

  switch (action.type) {
    case TEAM_ACTION.UPDATE_TEAMS: {
      const newMap = new Map()
      action.payload.forEach((team) => {
        newMap.set(team.id, team)
      })
      return { teamMap: newMap }
    }
    case TEAM_ACTION.UPDATE_MEMBERS: {
      const { teamId, members } = action.payload
      if (teamMap.has(teamId)) {
        const team = teamMap.get(teamId)
        team!.members = members
        return { teamMap: { ...teamMap } }
      } else {
        return { teamMap }
      }
    }
    default:
      return { teamMap }
  }
}