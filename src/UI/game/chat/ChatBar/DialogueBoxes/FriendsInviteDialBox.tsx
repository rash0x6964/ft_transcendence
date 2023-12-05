import SectionTitle from "@/UI/game/profile/SectionTitle"
import FriendRequest from "./FriendRequest"
import { useContext, useEffect, useState } from "react"
import Loader from "@/components/BaseComponents/Loader"
import FriendRequestService from "@/services/FriendRequest.service"
import FriendRequests from "@/models/FriendRequest.model"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"

import FriendInvite from "./FriendInvite"
import FriendService from "@/services/Friend.service"
import FriendStatus from "@/models/FriendStatus.model"
export default function FriendsInviteDialBox() {
  const [isLoading, setIsLoading] = useState(false)
  const [friends, setFriends] = useState<FriendStatus[]>([])

  useEffect(() => {
    setIsLoading(true)

    FriendService.getOnlineFriends()
      .then(({ data }: { data: FriendStatus[] }) => {
        setFriends(data)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="gradient-border-2 p-4 h-screen sm:h-[50vh] w-screen sm:w-fit sm:min-w-[29rem]  overflow-y-scroll rounded-none sm:rounded-xl flex flex-col gap-1">
      <SectionTitle className="text-sm" text="Friend Requests" />
      {!isLoading && (
        <div className="flex flex-col">
          {friends.map((data) => (
            <FriendInvite key={data.senderID} friendData={data} />
          ))}
        </div>
      )}
      {isLoading && (
        <div className=" flex flex-col flex-1 justify-center">
          <Loader className="mx-auto scale-50" />
        </div>
      )}

      {!isLoading && friends.length == 0 && (
        <div className="flex flex-col flex-1 justify-center">
          <span className="mx-auto"> 0 online Friends</span>
        </div>
      )}
    </div>
  )
}
