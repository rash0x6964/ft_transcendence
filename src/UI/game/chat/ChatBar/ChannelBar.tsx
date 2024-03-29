import Avatar from "@/components/BaseComponents/Avatar"
import { Channel } from "@/models/Channel.model"

type Prop = {
  src: string
  alt?: string
  channelName: string
  lastMessage: string
  time: string
  unread: number
  id: string
  data: Channel
  handleClick: (id: Channel) => void
  isSelected: boolean
}

export default function ChannelBar({
  src,
  alt,
  channelName,
  lastMessage,
  time,
  unread,
  isSelected,
  data,
  handleClick,
  id,
}: Prop) {
  return (
    <div
      onClick={() => handleClick(data)}
      className={`bg-secondary flex  w-96 h-[73px] rounded-xl items-center p-2 transition-colors gap-x-2 relative hover:border-primary border-2 cursor-pointer  ${
        isSelected ? "border-primary" : "border-transparent"
      }`}
    >
      {/* <div
        className={`w-full h-full rounded-xl top-0 left-0 blur-[2px]  absolute border-2 group-hover:border-primary  ${
          isSelected ? "border-primary" : "border-transparent"
        } `}
      ></div> */}
      <Avatar src={src} alt={alt} className="w-12 h-12" />
      <div className="w-12 h-12 grow">
        <p className="text-gray-300 text-base font-semibold">{channelName}</p>
        <p className="text-gray-600 text-sm truncate">{lastMessage}</p>
      </div>
      <div className="h-full flex flex-col justify-between items-end">
        <p className="text-gray-400 text-sm">{time}</p>
        {/* <p
					className={
						"bg-primary text-black text-xs rounded-full p-1 min-w-[20px] min-h-[20px] flex justify-center items-center font-semibold " +
						(unread ? "" : "hidden")
					}
				>
					{unread}
				</p> */}
      </div>
    </div>
  )
}
