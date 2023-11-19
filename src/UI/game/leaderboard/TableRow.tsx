import React from "react"
import Trophy from "@/components/svgs/Trophy"
import RP from "@/components/svgs/RP"
import Avatar from "@/components/BaseComponents/Avatar"

type Props = {
  rank: number
  playerAvatar: string
  playerName: string
  rp: number
  winrate: number | string
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
    <div className="h-14 w-fill bg-secondary grid grid-cols-10 drop-shadow-lg rounded-lg    pl-7 pr-16 text-sm">
      {/* Rank */}
      <div className="self-center flex gap-3 col-span-2">
        <Trophy />
        <span className="self-center">{rank}</span>
      </div>

      <div className="self-center flex gap-3 col-span-2  -ml-2">
        <Avatar
          href={"/game/profile/" + playerName}
          className="w-8 h-8"
          src={playerAvatar}
          alt={playerName}
        />
        <span className="self-center">{playerName}</span>
      </div>

      {/* Rating */}
      <div className="self-center flex gap-3 col-span-2 -ml-2">
        <RP className="text-primary fill-primary" />
        <span className="self-center">{rp} RP</span>
      </div>

      {/* Winrate */}
      <div className="self-center flex gap-3 col-span-2 pl-1">
        <span>{winrate} %</span>
      </div>

      {/* Game */}
      <div className="self-center flex gap-3 col-span-2 pl-1">
        <span>{nbGame}</span>
      </div>

      {/* player */}
    </div>
  )
}
