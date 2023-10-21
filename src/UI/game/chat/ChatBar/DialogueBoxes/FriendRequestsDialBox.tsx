import SectionTitle from "@/UI/game/profile/SectionTitle"
import FriendRequest from "./FriendRequest"

export default function FriendRequestsDialBox() {
  return (
    <div className="gradient-border-2 p-4 rounded-xl flex flex-col gap-1">
      <SectionTitle className="text-sm" text="Friend Requests" />
      <FriendRequest />
      <FriendRequest />
      <FriendRequest />
      <FriendRequest />
      <FriendRequest />
      <FriendRequest />
      <FriendRequest />
      <FriendRequest />
    </div>
  )
}
