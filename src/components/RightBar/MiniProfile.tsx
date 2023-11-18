import FriendAction from "@/UI/game/chat/FriendInfo/FriendAction"
import Avatar from "../BaseComponents/Avatar"
import RP from "../svgs/RP"
import MiniProfileButtons from "./MiniProfileButtons"
import User from "@/models/User.model"
import DirectMessageService from "@/services/DirectMessageService"
import DirectMessage from "@/models/DirectMessage.model"
import { useContext } from "react"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import { useRouter } from "next/router"
import FriendStatus from "@/models/FriendStatus.model"
import { handleFriendRemove } from "./Helpers/RightBarHandlers"
type Props = {
  friendStatus?: FriendStatus
  friendData?: User
  profileRef: React.Ref<HTMLDivElement>
  className: string
}

export default function MiniProfile({
  friendStatus,
  className,
  profileRef,
  friendData,
}: Props) {
  const router = useRouter()
  const socket = useContext(WebSocketContext)

  const handleSendMessage = () => {
    if (!friendData) return
    DirectMessageService.create(friendData.id)
      .then(({ data }: { data: DirectMessage }) => {
        socket?.emit("directMessage", { data })
        router.push(
          {
            pathname: "/game/chat",
            query: {
              type: "DM",
              id: data.id,
            },
          },
          "/game/chat"
        )
      })
      .catch((err) => {})
  }

  return (
    <div
      ref={profileRef}
      className={`w-96  gradient-border-2     right-16 rounded-md ${className}  `}
    >
      <img
        className="h-28 w-full bg-red-500 rounded-t-md object-cover"
        src={friendData?.bannerUrl}
      />
      <div className="flex flex-col items-center px-10 pb-10 -mt-10">
        <Avatar
          href={`/game/profile/${friendData?.userName}`}
          src={friendData?.avatarUrl}
          className="w-20 h-20 border-4 border-secondary drop-shadow-none  mb-2"
        />

        <p className="text-xl text-gray-300 font-medium mb-1 ">
          {friendData?.userName}
        </p>
        <div className="flex gap-2 items-center   mb-2">
          <RP className="text-primary " width={20} height={20} />
          <p className="text-sm text-slate-500  font-semibold ">
            {friendData?.profile.rating} RP
          </p>
        </div>
        <p
          className={`text-xs     ${
            !friendData?.onlineStatus ? "text-gray-500" : "text-primary"
          } font-light mb-10   `}
        >
          {friendData?.onlineStatus ? friendData?.state : "Offline"}
        </p>

        <div className="flex gap-8 justify-center w-full">
          <MiniProfileButtons
            onClick={() => handleFriendRemove(friendStatus, socket)}
            action="Unfriend"
          />
          {friendData?.onlineStatus && (
            <MiniProfileButtons action="Challenge" />
          )}
          <MiniProfileButtons onClick={handleSendMessage} action="Message" />
        </div>
      </div>
    </div>
  )
}
