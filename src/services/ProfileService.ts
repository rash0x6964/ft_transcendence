import { HttpClient } from "./HttpClient"

class ProfileService {
  private endPoint = "/profile"

  getCurrentProfile() {
    return HttpClient.get(`${this.endPoint}`)
  }
}

export default new ProfileService()
