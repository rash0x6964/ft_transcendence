import React, { PropsWithChildren } from "react"
import MainButton from "@/components/BaseComponents/MainButton"
import Avatar from "@/components/BaseComponents/Avatar"
import Image from "next/image"

type Props = {
  className?: string
  playerName: string
  memberCount: number
  online: boolean
  onAccept?: () => void
}

export default function FriendMessage({
  className,
  onAccept,
  playerName,
  online,
}: Props) {
  return (
    <div
      className={`text-xs border flex gap-2  flex-col rounded-md  border-gray-600 p-3 relative  ${className}`}
    >
      <img
        src="katana.jpg"
        alt=""
        className="bg-red-500 absolute w-full h-full object-cover top-0 -z-10 left-0"
      />
      <div className="bg-backdrop/50 absolute  w-full h-full object-cover top-0 -z-10 left-0"></div>
      <div className="text-gray-400 z-10">Player </div>
      <div className="flex justify-between">
        <div className="flex  font-semibold text-xl gap-3">
          <Avatar
            className="w-12 h-12"
            src="https://steamavatar.io/img/14777429717elSu.jpg"
          />
          <div className="flex flex-col justify-between py-1 text-xs">
            <div>{playerName}</div>
            {online && <div className="text-primary"> Online </div>}
            {!online && <div className="text-gray-600"> Offline </div>}
          </div>
        </div>
        <MainButton onClick={onAccept} className="px-5 py-3">
          Message
        </MainButton>
      </div>
    </div>
  )
}
