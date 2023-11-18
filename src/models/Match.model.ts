export default interface Match {
  id: number
  winnerID: string
  loserID: string
  winnerScore: number
  loserScore: number
  date: Date
  gameMode: string
  ranked: boolean
  duration: number
}
