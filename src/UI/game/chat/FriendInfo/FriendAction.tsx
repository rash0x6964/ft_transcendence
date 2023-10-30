import Block from "@/components/svgs/Block"
import Unfriend from "@/components/svgs/Unfriend"
import Mute from "@/components/svgs/Mute"
import AddUser from "@/components/svgs/DM-AddUser"

type Prop = {
  action: "Unfriend" | "Block" | "Mute" | "Add friend"
}

export default function FriendAction({ action }: Prop) {
  return (
    <div className="flex flex-col gap-y-2 hover:opacity-75 duration-500 hover:text-gray-300">
      <div className="h-14 w-14 rounded-xl border border-gray-600 flex justify-center items-center cursor-pointer">
        {action == "Unfriend" && <Unfriend />}
        {action == "Block" && <Block />}
        {action == "Mute" && <Mute />}
        {action == "Add friend" && <AddUser width={24}/>}
      </div>
      <p className="text-xs text-gray-500 self-center">{action}</p>
    </div>
  )
}
