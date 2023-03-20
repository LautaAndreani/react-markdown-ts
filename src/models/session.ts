export interface UserMetaData {
  avatar_url: string
  email: string
  full_name: string
  user_name: string
}

export interface User {
  id: string
  user_metadata: UserMetaData
}

export interface Session {
  access_token: string
  user: User
}
