import Profile from "./Profile.model"

export default interface ProfileData {
  id: string
  avatarUrl: string
  bannerUrl: string
  username: string
  profile: Profile
}
