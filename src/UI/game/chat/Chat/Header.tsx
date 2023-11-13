import Avatar from "@/components/BaseComponents/Avatar"
import React from "react"
import ProfileBadge from "@/components/svgs/ProfileBadge"

type Props = {
  className?: string
  msg: string
  self: boolean
  src?: string
  playerName?: string
  onInfoClick?: () => void
}
export default function Header({
  className,
  msg,
  playerName,
  self,
  src,
  onInfoClick,
}: Props) {
  return (
    <div
      className={`flex justify-between bg-secondary drop-shadow-md rounded-xl p-3 ${className}`}
    >
      <div className="flex ">
        <Avatar className="w-12 h-12 mr-4 " src={src} />
        <div className="flex flex-col">
          <div className="font-semibold text-base">{playerName}</div>
          <div className="font-normal text-sm text-gray-600 w-72 truncate ...">
            {" "}
            <span>{self && "You : "}</span> {msg}
          </div>
        </div>
      </div>
      <button
        onClick={onInfoClick}
        className="transition-opacity hover:opacity-60"
      >
        <ProfileBadge className="text-white" width={36} height={36} />
      </button>
    </div>
  )
}
