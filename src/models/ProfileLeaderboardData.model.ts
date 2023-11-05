import Profile from "./Profile.model"

export default interface ProfileLeaderboardData {
  id: string
  avatarUrl: string
  bannerUrl: string
  username: string
  profile: Profile
  winrate: number
  games: number
}
