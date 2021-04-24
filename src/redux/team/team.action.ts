import { RawTeam, Team, User } from '@type/team.type'
import { TeamAction, TEAM_ACTION } from './team.reduxType'

export const updateTeams = (teams: Team[] | RawTeam[]): TeamAction => ({
  type: TEAM_ACTION.UPDATE_TEAMS,
  payload: teams
})

export const updateMembers = (teamId: string, members: User[]): TeamAction => ({
  type: TEAM_ACTION.UPDATE_MEMBERS,
  payload: { teamId, members }
})

