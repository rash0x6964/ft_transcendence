import Achievement from "@/models/Achievement.model"
import { HttpClient } from "./HttpClient"

class AchievementService {
  private endpoint = "/achievement"

  getAllAchievements(): Promise<Achievement[]> {
    return HttpClient.get(`${this.endpoint}/all`).then(result => result.data)
  }

  getUserAchievements(): Promise<Achievement[]> {
    return HttpClient.get(`${this.endpoint}/user`).then(result => result.data)
  }
}

const achievementService = new AchievementService()

export default achievementService
