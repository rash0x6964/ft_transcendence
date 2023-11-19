import Lobby from "@/models/Lobby.model"

export default interface EndGameData {
  lobby: Lobby
  xp: number
  coins: number
  rating: number
}
