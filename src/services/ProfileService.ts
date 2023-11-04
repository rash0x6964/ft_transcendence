import ProfileData from "@/models/ProfileData.model"
import { HttpClient } from "./HttpClient"

class ProfileService {
  private endPoint = "/profile"

  getCurrentProfile() {
    return HttpClient.get(`${this.endPoint}`).then(res => res.data)
  }

  getCurrentProfileData() {
    return HttpClient.get(`${this.endPoint}/data`).then(res => res.data)
  }

  getProfileDataById(id: string) {
    return HttpClient.get(`${this.endPoint}/data/${id}`).then(res => res.data)
  }

  getProfileDataByUsername(name: string) {
    return HttpClient.get(`${this.endPoint}/data/name/${name}`).then(
      res => res.data
    )
  }

  getLeaderboard() {
    return HttpClient.get(`${this.endPoint}/leaderboard`).then(res => res.data)
  }

  getLeaderboardOffset(offset: number) {
    return HttpClient.get(`${this.endPoint}/leaderboard/${offset}`).then(
      res => res.data
    )
  }

  calculatePercentage(profileData: ProfileData) {
    return (
      ((profileData.profile.xp - profileData.xpRequirements.previous) /
        (profileData.xpRequirements.current -
          profileData.xpRequirements.previous)) *
      100
    )
  }
}

const profileService = new ProfileService()

export default profileService
