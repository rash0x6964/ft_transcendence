import { HttpClient } from "./HttpClient"

class ProfileService {
  private endPoint = "/profile"

  getCurrentProfile() {
    return HttpClient.get(`${this.endPoint}`)
  }
}

const profileService = new ProfileService()

export default profileService
