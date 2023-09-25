import Avatar from "@/components/BaseComponents/Avatar"

type Prop = {
  src: string
  alt?: string
  channelName: string
  lastMessage: string
  time: string
  unread: number
  id: number
  handleClick: (id: number) => void
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
  handleClick,
  id,
}: Prop) {
  return (
    <div
      onClick={() => handleClick(id)}
      className={`bg-secondary flex  w-96 h-[73px] rounded-xl items-center p-2 gap-x-2 relative hover:border-primary border-2 cursor-pointer  ${
        isSelected ? "border-primary" : "border-transparent"
      }`}
    >
      <div
        className={`w-full h-full rounded-xl top-0 left-0 blur-[2px]  absolute border-2 group-hover:border-primary  ${
          isSelected ? "border-primary" : "border-transparent"
        } `}
      ></div>
      <Avatar src={src} alt={alt} className="w-12 h-12" />
      <div className="w-12 h-12 grow">
        <p className="text-gray-300 text-base">{channelName}</p>
        <p className="text-gray-600 text-sm">{lastMessage}</p>
      </div>
      <div className="h-full flex flex-col justify-between items-end">
        <p className="text-gray-400 text-sm">{time}</p>
        <p
          className={
            "bg-primary text-black text-xs rounded-full p-1 min-w-[20px] min-h-[20px] flex justify-center items-center" +
            (unread ? "" : "hidden")
          }
        >
          {unread}
        </p>
      </div>
    </div>
  )
}
