import React, { MouseEventHandler } from "react"
import Avatar from "@/components/BaseComponents/Avatar"
import { MouseEvent } from "react"
import { ChannelUser } from "@/models/Channel.model"
type Props = {
  playerAvatar: string
  playerName: string
  playerState: string
  data: ChannelUser | undefined
  offline: boolean
  onContextMenu?: (
    e: MouseEvent<HTMLDivElement>,
    data: ChannelUser | undefined
  ) => void // enum
}

export default function MemberCard({
  playerAvatar,
  playerName,
  playerState,
  data,
  onContextMenu,
  offline,
}: Props) {
  const handleMouseEvent = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    onContextMenu && onContextMenu(e, data)
  }
  return (
    <div onContextMenu={handleMouseEvent}>
      <div
        className={`flex gap-3 px-3 max-w-[309px] min-w-fit ${
          offline ? "opacity-70" : ""
        }`}
      >
        <Avatar
          className="w-10 h-10 cursor-pointer"
          src={playerAvatar}
          alt={playerName}
        />
        <div className="flex flex-col gap-1">
          <span className="self-center text-sm">{playerName}</span>
          <span
            className={`text-[10px] font-light ${
              offline ? "text-gray-400" : "text-primary"
            }`}
          >
            {playerState}
          </span>
        </div>
      </div>
    </div>
  )
}
