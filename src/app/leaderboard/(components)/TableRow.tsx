import React from "react"
import Trophy from "../../../components/svgs/Trophy"
import RP from "../../../components/svgs/RP"

type Props = {
  rank: number
  playerAvatar: string
  playerName: string
  rp: number
  winrate: number
  nbGame: number
}

export default function TableRow({
  rank,
  playerAvatar,
  playerName,
  rp,
  winrate,
  nbGame,
}: Props) {
  return (
    <div className="h-14 w-fill bg-secondary shadow-md rounded-lg flex justify-around text-sm">
      {/* Rank */}
      <div className="self-center flex gap-3">
        <Trophy />
        <span className="self-center">{rank}</span>
      </div>

      {/* player */}
      <div className="self-center flex gap-3">
        <img
          className="rounded-full w-8"
          src={playerAvatar}
          alt=""
        />
        <span className="self-center">{playerName}</span>
      </div>

      {/* Rating */}
      <div className="self-center flex gap-3">
        <RP />
        <span className="self-center">{rp} RP</span>
      </div>

      {/* Winrate */}
      <div className="self-center flex gap-3">
        <span>{winrate} %</span>
      </div>

      {/* Game */}
      <div className="self-center flex gap-3">
        <span>{nbGame}</span>
      </div>
    </div>
  )
}
