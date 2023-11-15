import datePipe, { datePipe24 } from "@/pipes/date.pipes"
import FriendBar from "./FriendBar"
import DirectMessage from "@/models/DirectMessage.model"

type Prop = {
  selectedId: string
  DMList?: DirectMessage[]
  handleClick: (id: string) => void
}
export default function FriendsList({ selectedId, handleClick, DMList }: Prop) {
  return (
    <div className="flex flex-col h-[40%] gap-2 overflow-y-scroll animate__animated animate__fadeIn ">
      {DMList?.map((data: DirectMessage) => {
        const date = new Date(data.message?.createdAt ?? Date.now())
        return (
          <FriendBar
            key={data.id}
            id={data.id}
            handleClick={handleClick}
            isSelected={data.id == selectedId}
            src={
              data.friend?.avatarUrl ??
              "https://i.pinimg.com/564x/df/cd/79/dfcd797320e5340e606365f4047d1e79.jpg"
            }
            alt="Avatar"
            username={data.friend?.userName ?? "Unknown"}
            isOnline={data.friend?.onlineStatus ?? false}
            lastMessage={data.message?.content ?? "say hi!"}
            time={datePipe24(date)}
          />
        )
      })}
    </div>
  )
}
