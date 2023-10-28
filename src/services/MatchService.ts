import Match from "@/models/Match.model"
import { HttpClient } from "./HttpClient"
import UserService from "./User.Service"
import { getCurrent } from "./UsersService"

class MatchService {
  private endpoint = "/match"

  getAllMatches() {
    return HttpClient.get(`${this.endpoint}`)
  }

  getMatchProps(matches: Match[]) {
    return matches.map(async (match) => {
      const current = await getCurrent()
    })
  }
}

const matchService = new MatchService()

export default matchService
