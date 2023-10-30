import User from "@/models/User.model";
import FriendCard from "./FriendCard"
import FriendDuels from "./FriendDuels"

type Props = {
  friend: User | undefined,
};

export default function FriendInfo({ friend }: Props) {
  return (
    <div className="flex flex-col h-full">
      <FriendCard friend={friend}/>
      <FriendDuels className="flex flex-col overflow-y-scroll" />
    </div>
  )
}
