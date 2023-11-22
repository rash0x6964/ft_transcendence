import { useEffect, useState } from "react"
import ChannelSeparator from "./ChannelSeparator"
import ChannelsList from "./ChannelsList"
import FriendsList from "./FriendsList"
import TopBar from "./TopBar"
import DirectMessage from "@/models/DirectMessage.model"
import { Channel } from "@/models/Channel.model"
import ChannelSevice from "@/services/Channel.sevice"
import Loader from "@/components/BaseComponents/Loader"

type Props = {
  selectedId: string
  DMList?: DirectMessage[]
  channelList?: Channel[]
  clickOnDm: (id: string) => void
  clickOnChannel: (data: Channel) => void
  handleOnChange: (val: string) => void
  onCreateChannel: () => void

  isLoading: { dm: boolean; room: boolean }
}

export default function ChatBar({
  DMList,
  channelList,
  selectedId,
  clickOnDm,
  clickOnChannel,
  onCreateChannel,
  handleOnChange,
  isLoading,
}: Props) {
  return (
    <div className="flex flex-col h-full">
      <TopBar
        DMList={DMList}
        onChange={handleOnChange}
        onCreateChannel={onCreateChannel}
      />
      {isLoading.dm && <Loader className="mx-auto scale-50" />}
      {!isLoading.dm && (
        <FriendsList
          selectedId={selectedId}
          handleClick={clickOnDm}
          DMList={DMList}
        />
      )}
      <ChannelSeparator />
      {isLoading.room && <Loader className="mx-auto scale-50" />}
      {!isLoading.room && (
        <ChannelsList
          selectedId={selectedId}
          handleClick={clickOnChannel}
          channelList={channelList}
        />
      )}
    </div>
  )
}
