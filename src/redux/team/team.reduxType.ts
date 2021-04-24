import { RawTeam, Team, User } from '@type/team.type';
import { Action } from 'redux'

export interface TeamState {
  teamMap: Record<string, Team | RawTeam>;
}

export enum TEAM_ACTION {
  UPDATE_TEAMS = "UPDATE_TEAMS",
  UPDATE_MEMBERS = "UPDATE_MEMBERS",
  UPDATE_TEAM_DETAILS = "UPDATE_TEAM_DETAILS",
  UPDATE_TEAMLEAD = "UPDATE_TEAMLEAD"
}

export interface UpdateTeamsAction extends Action<TEAM_ACTION.UPDATE_TEAMS> {
  type: TEAM_ACTION.UPDATE_TEAMS,
  payload: Team[] | RawTeam[]
}

export interface UpdateTeamsDetailsAction extends Action<TEAM_ACTION.UPDATE_TEAM_DETAILS> {
  type: TEAM_ACTION.UPDATE_TEAM_DETAILS,
  payload: Team
}

export interface UpdateMembersAction extends Action<TEAM_ACTION.UPDATE_MEMBERS> {
  type: TEAM_ACTION.UPDATE_MEMBERS,
  payload: {
    teamId: string,
    members: User[]
  }
}

export interface UpdateTeamLeadAction extends Action<TEAM_ACTION.UPDATE_TEAMLEAD> {
  type: TEAM_ACTION.UPDATE_TEAMLEAD,
  payload: {
    teamId: string,
    teamLead: User
  }
}


export type TeamAction = UpdateTeamsAction |
  UpdateMembersAction |
  UpdateTeamLeadAction |
  UpdateTeamsDetailsAction