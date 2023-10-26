import { useContext, useEffect, useState } from "react"
import ChannelBar from "./ChannelBar"
import ChannelSevice from "@/services/Channel.sevice"
import { Channel } from "@/models/Channel.model"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"

type Prop = {
  selectedId: string,
  handleClick: (id: string) => void
}


export default function ChannelsList({ selectedId, handleClick}: Prop) {
  const socket = useContext(WebSocketContext);
  const [channelList, setChannelList] = useState<Channel[]>([]);

  useEffect(() => {
    ChannelSevice.getChannelList().then((data) => {
      setChannelList(data.data)
    }).catch(err => {

    })
  }, [])

  const join_Leave = () => {
    setChannelList([])
  }

  useEffect(() => {
    socket?.on("join/leave", join_Leave);
    return () => {
      socket?.off("join/leave", join_Leave);
    }
  }, [])

  return (
    <div className="flex flex-col gap-2 overflow-y-scroll">
      {
        channelList.map((data) => {
          return <ChannelBar
            key={data.id}
            id={data.id}
            channelName={data.name}
            handleClick={handleClick}
            isSelected={selectedId == data.id}
            lastMessage={data.message[0]?.content}
            src={data.imageUrl}
            time={"21:30"}
            unread={20}
          />
        })
      }
    </div>
  )
}
