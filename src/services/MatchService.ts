import Match from "@/models/Match.model"
import { HttpClient } from "./HttpClient"
import { getById } from "./UsersService"
import MatchDisplayData from "@/types/MatchDisplayData"
import ProfileData from "@/models/ProfileData.model"

class MatchService {
  private endpoint = "/match"

  getAllMatches(): Promise<Match[]> {
    return HttpClient.get(`${this.endpoint}`).then((result) => result.data)
  }

  getAllMatchesById(id: string): Promise<Match[]> {
    return HttpClient.get(`${this.endpoint}/${id}`).then(
      (result) => result.data
    )
  }

  getLatestMatches(take: number): Promise<Match[]> {
    return HttpClient.get(`${this.endpoint}/latest/${take}`).then(
      (result) => result.data
    )
  }

  getStats() {
    return HttpClient.get(`${this.endpoint}/stats`).then(
      (result) => result.data
    )
  }

  getStatsById(id: string) {
    return HttpClient.get(`${this.endpoint}/stats/${id}`).then(
      (result) => result.data
    )
  }

  async getMatchProps(
    profileData: ProfileData,
    matches: Match[]
  ): Promise<MatchDisplayData[]> {
    function datediff(first: number, second: number) {
      return Math.round((second - first) / (1000 * 60 * 60 * 24))
    }
    const current = profileData

    const promises: Promise<MatchDisplayData>[] = matches.map(
      async (match): Promise<MatchDisplayData> => {
        const enemyId =
          match.winnerID === current.id ? match.loserID : match.winnerID
        const enemy = await getById(enemyId)
        const days = datediff(new Date(match.date).getTime(), Date.now())

        return Promise.resolve({
          p_1: {
            username: current.username,
            url: current.avatarUrl,
          },
          p_2: {
            username: enemy.userName,
            url: enemy.avatarUrl,
          },
          s_1:
            match.winnerID === current.id
              ? match.winnerScore
              : match.loserScore,
          s_2:
            match.winnerID === enemy.id ? match.winnerScore : match.loserScore,
          win: current.id === match.winnerID ? true : false,
          type: match.ranked ? "Ranked" : "Normal",
          days,
          name: "Game",
        })
      }
    )

    const matchesDisplayData = Promise.all(promises)
    return matchesDisplayData
  }
}

const matchService = new MatchService()

export default matchService
