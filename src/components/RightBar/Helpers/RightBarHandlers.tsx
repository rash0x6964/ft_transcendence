import FriendService from "@/services/Friend.service"
import cookieService from "@/services/CookiesService"
import FriendStatus from "@/models/FriendStatus.model"
import { Socket } from "socket.io-client"
import { useContext, useEffect, useState } from "react"
import { NotifcationContext } from "@/UI/NotificationProvider"
import DMService from "@/services/DirectMessageService"
import DirectMessage from "@/models/DirectMessage.model"

export const handleFriendRemove = (
  selectedData: FriendStatus | undefined,
  socket: Socket | null
) => {
  if (!selectedData) return
  FriendService.removeFriend(selectedData)
    .then(() => {
      socket?.emit("friendAction", {
        token: cookieService.getJwtCookie(),
        data: selectedData,
      }).emit("unfriend", {data: selectedData})
    })
    .catch((err) => {})
}

export function useRightBarSocket(
  socket: Socket | null
): [
  friendList: FriendStatus[],
  setFriendList: React.Dispatch<React.SetStateAction<FriendStatus[]>>
] {
  const [friendList, setFriendList] = useState<FriendStatus[]>([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    FriendService.getFriendList()
      .then((data) => {
        // console.log(data)

        setFriendList(data.data)
      })
      .catch((err) => {})
  }, [refresh])

  useEffect(() => {
    const onConnect = (userId: string) => {
      setFriendList((prevStatus: FriendStatus[]) => {
        return prevStatus.map((data: FriendStatus) => {
          if (data.friend && data.friend.id == userId) {
            data.friend.state = "Online"
            data.friend.onlineStatus = true
          }
          return data
        })
      })
    }

    const onDisconnect = (userId: string) => {
      setFriendList((prevStatus: FriendStatus[]) => {
        return prevStatus.map((data: FriendStatus) => {
          if (data.friend && data.friend.id == userId) {
            data.friend.state = "Offline"
            data.friend.onlineStatus = false
          }
          return data
        })
      })
    }

    const onPresence = (data: any) => {
      setFriendList((users) => {
        return users.map((user) => {
          if (user.friend?.id == data.sender.id && user.friend?.state)
            user.friend.state = data.data
          return user
        })
      })
    }

    const onFriendAction = () => {
      setRefresh((prevState) => !prevState)
    }
    socket?.on("presence", onPresence)
    socket?.on("connected", onConnect)
    socket?.on("disconnected", onDisconnect)
    socket?.on("friendAction", onFriendAction)
    return () => {
      socket?.off("connected", onConnect)
      socket?.off("connected", onDisconnect)
      socket?.off("friendAction", onFriendAction)
      socket?.off("presence", onPresence)
    }
  }, [])

  return [friendList, setFriendList]
}
