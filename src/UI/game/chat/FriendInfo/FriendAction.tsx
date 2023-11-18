import Block from "@/components/svgs/Block"
import Unfriend from "@/components/svgs/Unfriend"
import Mute from "@/components/svgs/Mute"
import AddUser from "@/components/svgs/DM-AddUser"
import Unmute from "@/components/svgs/Unmute"
import Unblock from "@/components/svgs/Unblock"
import PendingReq from "@/components/svgs/pendingReq"

type Prop = {
  action: "Unfriend" | "Block" | "Mute" | "Add friend" | "Unmute" | "Unblock" | "Pending",
  onclick?: (e: any) => void
}



export default function FriendAction({ action, onclick }: Prop) {
  return (
    <div className="flex flex-col gap-y-2 hover:opacity-75 duration-500 hover:text-gray-300" onClick={onclick}>
      <div className="h-14 w-14 rounded-xl border border-gray-600 flex justify-center items-center cursor-pointer">
        {action == "Add friend" && <AddUser width={24} />}
        {action == "Unfriend" && <Unfriend />}
        {action == "Block" && <Block />}
        {action == "Unblock" && <Unblock width={33} />}
        {action == "Mute" && <Mute />}
        {action == "Unmute" && <Unmute width={30} />}
        {action == "Pending" && <PendingReq width={30}/>}
      </div>
      <p className="text-xs text-gray-500 self-center">{action}</p>
    </div>
  )
}
