import React from "react"
import PropWithClass from "@/types/PropWithClass"
import Avatar from "../BaseComponents/Avatar"
import PlayerCoins from "./PlayerCoins"
import Friend from "../svgs/Friend"
type Props = {
  coins: number
  name: string
  src: string
  className?: string
}
export default function PlayerName({
  coins,
  name,
  src,
  className,
}: Props & PropWithClass) {
  return (
    <div className={className}>
      <div className="flex  gap-2 ">
        <div className="w-[1px] h-[40px] hidden md:block mr-4 bg-slate-700 my-auto "></div>
        <div className="flex flex-col gap-2 mr-4">
          <span className="text-sm my-auto mr-2 flex gap-2">
            <Friend width={18} height={18} className="md:hidden" /> {name}
          </span>
          <PlayerCoins className="my-auto block   md:hidden" coins={coins} />
        </div>

        <Avatar
          href={`/game/profile/${name}`}
          src={src}
          alt={name}
          className="w-12 h-12"
        />
      </div>
    </div>
  )
}
