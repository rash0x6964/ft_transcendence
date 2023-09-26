import FriendCard from "./FriendCard"
import FriendDuels from "./FriendDuels"

export default function FriendInfo() {
  return (
    <div className="flex flex-col h-full">
      <FriendCard />
      <FriendDuels className=" h-3/5" />
    </div>
  )
}
