import React, { PropsWithChildren, useEffect, useState } from "react"
import Swords from "@/components/svgs/Swords"
import MainButton from "@/components/BaseComponents/MainButton"
import Avatar from "@/components/BaseComponents/Avatar"
import ChannelSevice from "@/services/Channel.sevice"
import { Channel } from "@/models/Channel.model"
import Link from "next/link"
import { useRouter } from "next/router"
type Props = {
  channelId: string
  className?: string
  onAccept?: () => void
}

export default function ChannelInvite({
  className,
  onAccept,
  channelId,
}: Props) {
  const [channel, setChannel] = useState<Channel | undefined | null>(undefined)
  const router = useRouter()

  const handleJoin = () => {
    router.push(
      {
        pathname: "/game/chat",
        query: {
          type: "invite",
          id: channelId,
        },
      },
      "/game/chat"
    )
  }
  useEffect(() => {
    ChannelSevice.getChannelById(channelId)
      .then(({ data }) => {
        setChannel(data)
      })
      .catch((err) => {
        setChannel(null)
      })
  }, [])
  if (channel === null)
    return (
      <div
        className={`bg-mirage text-xs w-72 border h-28 flex gap-2   rounded-md justify-center  border-gray-600 p-3  ${className}`}
      >
        <span className="my-auto ">Channel has been deleted</span>
      </div>
    )
  if (channel === undefined)
    return (
      <div
        className={`bg-mirage text-xs w-72 border h-28 flex gap-2   rounded-md justify-center  border-gray-600 p-3  ${className}`}
      >
        <span className="loaderLobby  my-auto "></span>
      </div>
    )
  return (
    <div
      className={`bg-mirage text-xs w-72  border flex gap-2  flex-col rounded-md  border-gray-600 p-3  ${className}`}
    >
      <div className="text-gray-600">Channel Invite </div>
      <div className="flex justify-between">
        <div className="flex  font-semibold text-xl gap-3">
          <Avatar className="w-12 h-12" src={channel.imageUrl} />
          <div className="flex flex-col justify-between py-1 text-xs">
            <div>{channel?.name}</div>
            <div className="text-gray-600 ">
              {channel?.channels.length} members
            </div>
          </div>
        </div>

        <MainButton onClick={handleJoin} className="px-5 py-3">
          Join
        </MainButton>
      </div>
    </div>
  )
}
