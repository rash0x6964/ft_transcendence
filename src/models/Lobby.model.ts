import { UUID } from "crypto"
import UserData from "./UserData.model"

export default interface Lobby {
  id?: UUID
  players: [UserData, UserData]
  ranked: boolean
  mode: string
  owner: string
  queueLobby: boolean
  isOwner?: boolean
  lobbySate: "ingame" | "idle" | "starting" | "finished"
  gameData: GameData
  intervalId?: NodeJS.Timeout
}
interface GameData {
  paddle1: Paddle
  paddle2: Paddle
  ball: Ball
  score: number[]
  scoreUpdated: boolean
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
