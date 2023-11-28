import { UUID } from "crypto"
import UserData from "./UserData.model"
import { Repo } from "./Repo.model"

export default interface Lobby {
  id?: UUID
  players: [UserData, UserData]
  ranked: boolean
  mode: string
  owner: string
  queueLobby: boolean
  isOwner?: boolean
  lobbySate: "ingame" | "idle" | "starting" | "finishing"
  gameData: GameData
  intervalId?: NodeJS.Timeout
  skins?: Repo[]
}
interface GameData {
  paddle1: Paddle
  paddle2: Paddle
  ball: Ball
  score: number[]
  scoreUpdated: boolean
  gameStartDate: number
  timer: number
}

interface Paddle {
  x: number
  y: number
  isUP: boolean
  isDown: boolean
}

interface Ball {
  x: number
  y: number
  xDirection: number
  yDirection: number
}
