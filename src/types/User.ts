export type User = {
  id: string
  userName: string
  email: string
  fullName: string
  avatarUrl: string
  bannerUrl: string
}

export type UpdateUser = {
  id?: string
  userName?: string
  email?: string
  fullName?: string
  avatarUrl?: string
  bannerUrl?: string
}

export type UpdatePassword = {
  password: string
  newPassword: string
}

type provider = "GOOGLE" | "INTRA" | "GITHUB"

export type LinkedAccount = {
  id: string
  userID: string
  provider: provider
  email: string
  providerID: string
}
