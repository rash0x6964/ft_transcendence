import Input from "@/components/BaseComponents/Input"
import Search from "@/components/svgs/Search"
import ChannelMember from "./ChannelMember"
import { useContext, useEffect, useState } from "react"
import User from "@/models/User.model"
import Loader from "@/components/BaseComponents/Loader"
import UserService from "@/services/User.Service"
import FriendRequestService from "@/services/FriendRequest.service"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import cookieService from "@/services/CookiesService"
import { AxiosError } from "axios"
import { NotifcationContext } from "@/UI/NotificationProvider"

import DirectMessageService from "@/services/DirectMessageService"
import { useRouter } from "next/router"
import DirectMessage from "@/models/DirectMessage.model"

export default function SearchPersonDialBox() {
  const socket = useContext(WebSocketContext)
  const [val, setVal] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const notify = useContext(NotifcationContext)
  const router = useRouter()
  const handleSendMessage = (receiverID: string) => {
    DirectMessageService.create(receiverID)
      .then(({ data }: { data: DirectMessage }) => {
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
  useEffect(() => {
    if (val == "") {
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    const timeout = setTimeout(() => {
      UserService.findByName(val)
        .then((data) => {
          setUsers(data.data)
          setIsLoading(false)
        })
        .catch((err) => {})
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [val])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value)
  }

  const handleSendRequest = (receiverID: string) => {
    FriendRequestService.sendRequest(receiverID)
      .then((data) => {
        socket?.emit("friendReqAction", {
          token: cookieService.getJwtCookie(),
          data: data.data,
        })
        notify({
          message: "Friend Request sent",
          title: "Friend Request",
        })
      })
      .catch((err: AxiosError<AxiosError, any>) => {
        if (!err.response) return
        if (err.response.status == 409)
          notify({
            message: err.response?.data.message,
            title: "Notice",
            type: "notice",
          })
      })
  }

  return (
    <div className="gradient-border-2 min-w-[29rem]  w-fit gradient-border-2 p-4 rounded-xl flex flex-col gap-1 ">
      <Input
        autoFocus={true}
        value={val}
        onChange={handleChange}
        className="mb-4 w-full h-11 bg-big-stone mx-auto"
        placeholder="Search"
        icon={<Search />}
      />

      {isLoading && <Loader className="mx-auto scale-50" />}

      {!isLoading &&
        users.length > 0 &&
        users.map((data: User) => (
          <ChannelMember
            onMessage={() => handleSendMessage(data.id)}
            key={data.id}
            onSendRequest={() => handleSendRequest(data.id)}
            className="animate__animated animate__fadeIn"
            src={data.avatarUrl}
            userName={data.userName}
          />
        ))}
    </div>
  )
}
