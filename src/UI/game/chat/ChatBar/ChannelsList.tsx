import { datePipe24 } from "@/pipes/date.pipes"
import ChannelBar from "./ChannelBar"
import { Channel } from "@/models/Channel.model"

type Prop = {
  selectedId: string
  channelList?: Channel[]
  handleClick: (data: Channel) => void
}

export default function ChannelsList({
  selectedId,
  handleClick,
  channelList,
}: Prop) {
  return (
    <div className="flex flex-col gap-2 overflow-y-scroll animate__animated animate__fadeIn">
      {channelList?.map((data) => {
        const date = new Date(
          (data.message && data.message[0] && data.message[0]?.createdAt) ||
            Date.now()
        )
        return (
          <ChannelBar
            key={data.id}
            id={data.id}
            channelName={data.name}
            data={data}
            handleClick={handleClick}
            isSelected={selectedId == data.id}
            lastMessage={
              (data.message && data.message[0]?.content) ??
              "say hi to your friends!"
            }
            src={data.imageUrl}
            time={datePipe24(date)}
            unread={20}
          />
        )
      })}
    </div>
  )
}
