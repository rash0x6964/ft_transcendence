import User from "@/models/User.model"
import FriendCard from "./FriendCard"
import FriendDuels from "./FriendDuels"
import DirectMessage from "@/models/DirectMessage.model"

type Props = {
  dm: DirectMessage
  takeAction: {
    block: () => void
    unblock: () => void
    mute: () => void
    unmute: () => void
    addFriend: () => void
    removFriend: () => void
    cancleReq: () => void
  }
}

export default function FriendInfo({ dm, takeAction }: Props) {
  return (
    <div className="flex flex-col h-full">
      <FriendCard dm={dm} takeAction={takeAction} />
      <FriendDuels className="flex flex-col overflow-y-scroll" />
    </div>
  )
}
