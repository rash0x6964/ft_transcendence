import Avatar from "@/components/BaseComponents/Avatar"
import FriendAction from "./FriendAction"
import RP from "@/components/svgs/RP"
import User from "@/models/User.model"
import DirectMessage from "@/models/DirectMessage.model"
import DMService from "@/services/DirectMessageService"
import FriendRequestService from "@/services/FriendRequest.service"
import { useContext } from "react"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import FriendService from "@/services/Friend.service"

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

export default function FriendCard({ dm, takeAction }: Props) {
  const socket = useContext(WebSocketContext)
  const friend: User | undefined = dm?.friend

  const obj: { senderID: string; receiverID: string } = {
    senderID: dm?.senderID,
    receiverID: dm?.receiverID,
  }

  const block = () => {
    DMService.blockUser(obj)
      .then((res) => {
        // console.log("res:", res.data)
        takeAction.block()
      })
      .catch((err) => {
        // console.log("err:", err.data)
      })
  }

  const unblock = () => {
    DMService.unBlockUser(obj)
      .then((res) => {
        // console.log("res:", res.data)
        takeAction.unblock()
      })
      .catch((err) => {
        // console.log("err:", err.data)
      })
  }

  const mute = () => {
    DMService.muteUser(obj)
      .then((res) => {
        takeAction.mute()
      })
      .catch((err) => {})
  }

  const unmute = () => {
    DMService.unMuteUser(obj)
      .then((res) => {
        takeAction.unmute()
      })
      .catch((err) => {})
  }

  const uiFriendShip = () => {
    if (dm?.isFriend)
      return <FriendAction action="Unfriend" onclick={takeAction.removFriend} />
    else if (dm?.pending)
      return <FriendAction action="Pending" onclick={takeAction.cancleReq} />
    else return <FriendAction action="Add friend" onclick={takeAction.addFriend} />
  }

  return (
    <div className=" gradient-border-2 w-96 max-h-[465px] drop-shadow-lg flex flex-col items-center justify-around p-10">
      <Avatar
        href={`/game/profile/${friend?.userName}`}
        src={friend?.avatarUrl}
        className="w-40 h-40 mb-2"
      />
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
        {uiFriendShip()}
        {dm?.blockStatus == "NONE" ||
        (dm?.blockStatus == "SENDER" && dm.senderID == dm?.friend?.id) ||
        (dm?.blockStatus == "RECEIVER" && dm.receiverID == dm?.friend?.id) ? (
          <FriendAction action="Block" onclick={block} />
        ) : (
          <FriendAction action="Unblock" onclick={unblock} />
        )}
        {dm?.muteStatus == "NONE" ||
        (dm?.muteStatus == "SENDER" && dm.senderID == dm?.friend?.id) ||
        (dm?.muteStatus == "RECEIVER" && dm.receiverID == dm?.friend?.id) ? (
          <FriendAction action="Mute" onclick={mute} />
        ) : (
          <FriendAction action="Unmute" onclick={unmute} />
        )}
      </div>
    </div>
  )
}
