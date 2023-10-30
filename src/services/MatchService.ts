import Match from "@/models/Match.model"
import { HttpClient } from "./HttpClient"
import { getById, getCurrent } from "./UsersService"
import MatchDisplayData from "@/types/Match"

class MatchService {
  private endpoint = "/match"

  getAllMatches() {
    return HttpClient.get(`${this.endpoint}`)
  }

  async getMatchProps(matches: Match[]): Promise<MatchDisplayData[]> {
    const current = await getCurrent()

    return matches.map(async (match) => {
      const enemyId =
        match.winnerID == current.id ? match.loserID : match.winnerID
      const enemy = await getById(enemyId)

      return {}
    })
  }
}

const matchService = new MatchService()

export default matchService
