import { Team, User } from '@type/team.type';
import { Action } from 'redux'

export interface TeamState {
  teamMap: Map<string, Team>;
}

export enum TEAM_ACTION {
  UPDATE_TEAMS = "UPDATE_TEAMS",
  UPDATE_MEMBERS = "UPDATE_MEMBERS"
}

export interface UpdateTeamsAction extends Action<TEAM_ACTION.UPDATE_TEAMS> {
  type: TEAM_ACTION.UPDATE_TEAMS,
  payload: Team[]
}

export interface UpdateMembersAction extends Action<TEAM_ACTION.UPDATE_MEMBERS> {
  type: TEAM_ACTION.UPDATE_MEMBERS,
  payload: {
    teamId: string,
    members: User[]
  }
}


export type TeamAction = UpdateTeamsAction | UpdateMembersAction