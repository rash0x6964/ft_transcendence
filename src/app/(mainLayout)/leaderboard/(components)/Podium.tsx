import React from "react"
import RP from "../../../../components/svgs/RP"

type Props = {
  playerName: string
  playerAvatar: string
  rp: number
  position: number
}

export default function Podium({
  playerName,
  playerAvatar,
  rp,
  position,
}: Props) {
  return (
    <div
      className={
        "flex flex-col gap-3 " +
        (position === 2
          ? "mt-14 order-1"
          : position === 3
          ? "mt-14 order-3"
          : "order-2")
      }
    >
      <div className="self-center relative mb-3">
        <img className="rounded-full border-4 w-36" src={playerAvatar} alt="" />
        <span className="text-xl text-center w-10 h-10 rounded-full border-4 absolute bottom-[-15px] left-[52px] bg-secondary">
          {position}
        </span>
      </div>

      <span className="self-center">{playerName}</span>

      <div className="flex gap-3 self-center">
        <RP />
        <span className="">{rp} RP</span>
      </div>
    </div>
  )
}
