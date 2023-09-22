import React from "react"
import Sound from "../svgs/Sound"
import Notif from "../svgs/Notif"
import GameController from "../svgs/GameController"
import Menu from "../svgs/Menu"
import Chat from "../svgs/Chat"
import LeaderBoard from "../svgs/LeaderBoard"

type Props = {
  className?: string
}

export default function LeftBar({ className }: Props) {
  return (
    <div className={className}>
      <div className="mt-5 flex items-center flex-col gap-y-5">
        <Menu  />
        <GameController />
        <Chat />
        <LeaderBoard />
      </div>
      <div className="mb-2 flex items-center flex-col gap-y-4">
        <Notif />
        <div className="w-[40px] h-[1px] bg-slate-700 "></div>
        <Sound />
      </div>
    </div>
  )
}
