import Achievement from "@/models/Achievement.model"
import Lobby from "@/models/Lobby.model"

export default interface EndGameData {
  lobby: Lobby
  xp: number
  coins: number
  rating: number
  achievements: Achievement[]
}
