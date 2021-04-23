import axios from '../config/axios';

export interface User {
  id: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  location?: string;
}

export interface Team {
  id: string;
  name: string;
  teamLeadId?: string;
  teamMemberIds: string[];
}


export const getAllUsers = async () => {
  try {
    const { data: users } = await axios.get<User[]>("/users")
    if (users.length) {
      return users
    } else {
      return []
    }
  } catch (err) {
    throw err
  }
}

export const getAllTeams = async () => {
  try {
    const { data: teams } = await axios.get<Team[]>("/teams")
    if (teams.length) {
      return teams
    } else {
      return []
    }
  } catch (err) {
    throw err
  }
}

export const getUser = async (userId: string) => {
  try {
    const { data: user } = await axios.get<User>(`/users/${userId}`)
    if (user) {
      return user
    } else {
      return undefined
    }
  } catch (e) {
    throw e
  }
}

export const getTeam = async (teamId: string) => {
  try {
    const { data: team } = await axios.get<Team>(`/team/${teamId}`)
    if (team) {
      return team
    } else {
      return undefined
    }
  } catch (err) {
    throw err
  }
}

export const getManyUsers = (userIds: string[]) => {
  const promises = userIds.map((userId) => {
    return new Promise<User>(async (resolve, reject) => {
      try {
        const user = await getUser(userId)
        if (user) {
          resolve(user)
        } else {
          reject("invalid userId")
        }
      } catch (e) {
        reject(e)
      }
    })
  })

  return Promise.all(promises)
}

