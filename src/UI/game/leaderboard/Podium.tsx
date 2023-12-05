import React from "react"
import RP from "@/components/svgs/RP"
import Avatar from "@/components/BaseComponents/Avatar"

type Props = {
  playerName: string
  playerAvatar: string
  rp: number
  position: number
  count: number
}

const paddingStyle = (position: number, count: number) => {
  let style = "flex flex-col gap-3 "

  if (count < 3) return style

  if (position === 2) return style + "mt-14 order-1"
  else if (position === 3) return style + "mt-14 order-3"
  else return style + "order-2"
}

const colorStyle = (position: number) => {
  if (position === 1) return "border-[#FFDB2D]"
  else if (position === 2) return "border-[#C0C0C0]"
  else return "border-[#CD7F32]"
}

export default function Podium({
  playerName,
  playerAvatar,
  rp,
  position,
  count,
}: Props) {
  return (
    <div className={paddingStyle(position, count)}>
      <div className="self-center relative mb-3">
        <Avatar
          href={`/game/profile/` + playerName}
          className={
            " border-2 md:border-4 w-24 h-24 md:w-36 md:h-36 " + colorStyle
          }
          src={playerAvatar}
          alt=""
        />
        <div className="w-full flex justify-center">
          <span
            className={
              "text-xl text-center w-10 h-10 rounded-full border-2 md:border-4 absolute bottom-[-15px]  bg-secondary " +
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
