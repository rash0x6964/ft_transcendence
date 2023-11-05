import Avatar from "@/components/BaseComponents/Avatar"
import FriendAction from "./FriendAction"
import RP from "@/components/svgs/RP"
import User from "@/models/User.model"

type Props = {
  friend: User | undefined
}

export default function FriendCard({ friend }: Props) {
  return (
    <div className=" gradient-border-2 w-96 max-h-[465px] drop-shadow-lg flex flex-col items-center justify-around p-10">
      <Avatar src={friend?.avatarUrl} className="w-40 h-40 mb-2" />
      <p className="text-xl text-gray-300 font-semibold mb-1 ">
        {friend?.userName}
      </p>
      <div className="flex gap-2 items-center   mb-10">
        <RP className="text-primary " width={20} height={20} />
        <p className="text-sm text-slate-500  font-semibold ">
          {friend?.profile.rating} RP
        </p>
      </div>

      <div className="flex w-full space justify-around ">
        {true ? (
          <FriendAction action="Unfriend" />
        ) : (
          <FriendAction action="Add friend" />
        )}
        <FriendAction action="Block" />
        <FriendAction action="Mute" />
      </div>
    </div>
  )
}
