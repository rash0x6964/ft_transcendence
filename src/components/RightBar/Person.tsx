import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import Avatar from "../BaseComponents/Avatar"
import { MouseEvent } from "react"
import RP from "../svgs/RP"
import FriendAction from "@/UI/game/chat/FriendInfo/FriendAction"
import MiniProfile from "./MiniProfile"
import FriendStatus from "@/models/FriendStatus.model"
import User from "@/models/User.model"
import { handleFriendRemove } from "./Helpers/RightBarHandlers"
type Props = {
  friendStatusData?: FriendStatus
}

export default function Person({ friendStatusData }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const [showProfile, setShowProfile] = useState(false)

  const friend = friendStatusData?.friend
  useEffect(() => {
    let handler = (e: any) => {
      if (!profileRef.current) return
      if (ref.current && ref.current.contains(e.target)) return
      if (profileRef.current.contains(e.target)) return

      setShowProfile(false)
    }
    document.addEventListener("mouseup", handler)

    return () => {
      document.removeEventListener("mouseup", handler)
    }
  }, [])

  const handleContextMenu = (e: any) => {
    e.preventDefault()
    setShowProfile((prev) => !prev)
  }

  return (
    <>
      <div className="w-9 relative flex flex-col items-center">
        {showProfile && (
          <MiniProfile
            onClick={() => setShowProfile((prev) => !prev)}
            friendStatus={friendStatusData}
            friendData={friend}
            profileRef={profileRef}
            className=" z-20 -mr-9 mt-3 absolute"
          />
        )}
        <div ref={ref} onContextMenu={handleContextMenu}>
          <Avatar
            onClick={() => setShowProfile((prev) => !prev)}
            className="rounded-full border-2 h-9 w-9"
            src={friend?.avatarUrl || ""}
            alt={friend?.userName}
          />
        </div>

        {friend?.onlineStatus && (
          <div
            className={
              "bg-green-500 rounded-full w-2 h-2 absolute z-10 right-1 top-7 "
            }
          ></div>
        )}

        <span className="text-xs truncate ... max-w-full">
          {friend?.userName}
        </span>
      </div>
    </>
  )
}
