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
import { ProfileContext } from "@/UI/ActiveUserProvider"
import { NotifcationContext } from "@/UI/NotificationProvider"
import { motion } from "framer-motion"
type Props = {
  friendStatus?: FriendStatus
  friendData?: User
  profileRef: React.Ref<HTMLDivElement>
  className: string
  onClick: () => void
}

export default function MiniProfile({
  friendStatus,
  className,
  profileRef,
  friendData,
  onClick,
}: Props) {
  const router = useRouter()
  const socket = useContext(WebSocketContext)
  const notify = useContext(NotifcationContext)
  const { profileData } = useContext(ProfileContext)

  const handleChallenge = () => {
    socket?.emit("lobbyInvite", {
      data: {
        receiver: friendData?.id,
        senderInfo: profileData,
      },
    })

    notify({
      title: "Lobby invite",
      message: "Lobby invite has been sent to " + friendData?.userName,
      imgSrc: friendData?.avatarUrl,
    })
  }
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
    <motion.div
      ref={profileRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className={`w-96  gradient-border-2     right-16 rounded-md ${className}  `}
    >
      <img
        className="h-28 w-full bg-secondary rounded-t-md object-cover"
        src={friendData?.bannerUrl}
      />
      <div className="flex flex-col items-center px-10 pb-10 -mt-10">
        <Avatar
          href={`/game/profile/${friendData?.userName}`}
          src={friendData?.avatarUrl}
          className="w-20 h-20 border-4 border-secondary drop-shadow-none   hover:opacity-90"
        />
        <div className="w-5 h-5 relative  mx-auto -mt-4 mb-2">
          <div className="w-5 h-5 rotate-45 bg-secondary-400 absolute"></div>
          <div className="text-[10px] absolute w-full  text-center">
            {friendData?.profile.level}
          </div>
          <div className="w-full  absolute bottom-0 ">
            <div className="w-0 h-0 border-l-4 border-l-transparent border-t-4 border-primary border-r-4 border-r-transparent right-[-2px] mx-auto "></div>
          </div>

          <div className="w-full  absolute bottom-0 blur-[2px] ">
            <div className="w-0 h-0 border-l-4 border-l-transparent border-t-4 border-primary border-r-4 border-r-transparent right-[-2px] mx-auto "></div>
          </div>
        </div>

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

        <div className="flex gap-10 justify-center w-full">
          <MiniProfileButtons
            onClick={() => {
              handleFriendRemove(friendStatus, socket)
              onClick()
            }}
            action="Unfriend"
          />
          {friendData?.onlineStatus && (
            <MiniProfileButtons
              onClick={() => {
                handleChallenge()
                onClick()
              }}
              action="Challenge"
            />
          )}
          <MiniProfileButtons
            onClick={() => {
              handleSendMessage()
              onClick()
            }}
            action="Message"
          />
        </div>
      </div>
    </motion.div>
  )
}
