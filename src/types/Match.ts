import Player from "./Player"

export default interface MatchDisplayData {
  p_1: Player
  p_2: Player
  s_1: number
  s_2: number
  name: string
  type: "Normal" | "Ranked"
  win: boolean
  days: number
}
