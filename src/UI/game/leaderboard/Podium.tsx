import React from "react"
import RP from "@/components/svgs/RP"
import Avatar from "@/components/BaseComponents/Avatar"

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
  let paddingStyle =
    "flex flex-col gap-3 " +
    (position === 2
      ? "mt-14 order-1"
      : position === 3
      ? "mt-14 order-3"
      : "order-2")
  let colorStyle =
    position === 1
      ? "border-[#FFDB2D]"
      : position === 2
      ? "border-[#C0C0C0]"
      : "border-[#CD7F32]"
  return (
    <div className={paddingStyle}>
      <div className="self-center relative mb-3">
        <Avatar
          href={`/game/profile/` + playerName}
          className={" border-4 w-36 h-36 " + colorStyle}
          src={playerAvatar}
          alt=""
        />
        <div className="w-full flex justify-center">
          <span
            className={
              "text-xl text-center w-10 h-10 rounded-full border-4 absolute bottom-[-15px]  bg-secondary " +
              colorStyle
            }
          >
            {position}
          </span>
        </div>
      </div>

      <span className="self-center">{playerName}</span>

      <div className="flex gap-3 self-center">
        <RP className="text-primary" />
        <span className="">{rp} RP</span>
      </div>
    </div>
  )
}
