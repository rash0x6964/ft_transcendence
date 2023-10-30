import { useContext, useEffect, useState } from "react"
import ChannelBar from "./ChannelBar"
import ChannelSevice from "@/services/Channel.sevice"
import { Channel } from "@/models/Channel.model"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"

type Prop = {
  selectedId: string,
  channelList?: Channel[],
  handleClick: (id: string) => void
}


export default function ChannelsList({ selectedId, handleClick, channelList}: Prop) {

  return (
    <div className="flex flex-col gap-2 overflow-y-scroll">
      {
        channelList?.map((data) => {
				  const date = new Date((data.message && data.message[0]?.createdAt) || Date.now())
          return <ChannelBar
            key={data.id}
            id={data.id}
            channelName={data.name}
            handleClick={handleClick}
            isSelected={selectedId == data.id}
            lastMessage={(data.message && data.message[0]?.content)??"say hi to your friends!"}
            src={data.imageUrl}
            time={`${date.getHours()}:${date.getMinutes()}`}
            unread={20}
          />
        })
      }
    </div>
  )
}
