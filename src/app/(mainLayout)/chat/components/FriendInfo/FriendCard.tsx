import Avatar from "@/components/BaseComponents/Avatar"
import FriendAction from "./FriendAction"

export default function FriendCard() {
  return (
    <div className=" gradient-border-2 w-96 h-[465px] drop-shadow-lg flex flex-col items-center justify-around p-10">
      <Avatar
        src="https://steamavatar.io/img/1477351897dU2fO.jpg"
        className="w-40 h-40"
      />
      <p className="text-xl text-gray-300 font-semibold ">K1NCH3RO</p>
      <p className="text-base text-slate-500 mb-10 font-semibold ">8500 RP</p>
      <div className="flex w-full space justify-around ">
        <FriendAction action="Unfriend" />
        <FriendAction action="Block" />
        <FriendAction action="Mute" />
      </div>
    </div>
  )
}
