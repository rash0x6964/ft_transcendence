import Avatar from "@/components/BaseComponents/Avatar"
import FriendAction from "./FriendAction"
import RP from "@/components/svgs/RP"
export default function FriendCard() {
  return (
    <div className=" gradient-border-2 w-96 max-h-[465px] drop-shadow-lg flex flex-col items-center justify-around p-10">
      <Avatar
        src="https://steamavatar.io/img/1477351897dU2fO.jpg"
        className="w-40 h-40 mb-2"
      />
      <p className="text-xl text-gray-300 font-semibold mb-1 ">K1NCH3RO</p>
      <div className="flex gap-2 items-center   mb-10">
        <RP className="text-primary " width={20} height={20} />
        <p className="text-sm text-slate-500  font-semibold ">8500 RP</p>
      </div>

      <div className="flex w-full space justify-around ">
        <FriendAction action="Unfriend" />
        <FriendAction action="Block" />
        <FriendAction action="Mute" />
      </div>
    </div>
  )
}
