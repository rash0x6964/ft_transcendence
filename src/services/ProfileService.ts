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
}

const profileService = new ProfileService()

export default profileService
