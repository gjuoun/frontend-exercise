export interface User {
  id: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  location?: string;
}

export interface RawTeam {
  id: string;
  name: string;
  teamLeadId?: string;
  teamMemberIds: string[];
}

export interface Team extends RawTeam {
  members: User[];
}