export interface RawUser {
  id: string;
  displayName: string;
}

export interface User extends RawUser {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  location: string;
  role: string;
}

export interface RawTeam {
  id: string;
  name: string;
}

export interface Team extends RawTeam {
  teamLeadId: string;
  teamMemberIds: string[];
  members?: User[];
  teamLead?: User;
}
