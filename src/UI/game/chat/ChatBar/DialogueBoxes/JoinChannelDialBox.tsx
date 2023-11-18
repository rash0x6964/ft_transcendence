import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import Avatar from "@/components/BaseComponents/Avatar"
import Input from "@/components/BaseComponents/Input"
import MainButton from "@/components/BaseComponents/MainButton"
import Lock from "@/components/svgs/Lock"
import { Channel, ChannelUser, JoinChannel } from "@/models/Channel.model"
import ChannelSevice from "@/services/Channel.sevice"
import { useContext, useEffect, useState } from "react"
import cookieService from "@/services/CookiesService"

type Props = {
  channelInfo: Channel
  onJoin: (data: any) => void
}

export default function JoinChannelDialBox({ channelInfo, onJoin }: Props) {
  const socket = useContext(WebSocketContext)
  const [password, setPassword] = useState("")
  const [lock, setLock] = useState(true)

  const [errorLog, setErrorLog] = useState([])
  const [processing, setProcessing] = useState(false)
  const [memberStatus, setMemberStatus] = useState<any>({})

  useEffect(() => {
    ChannelSevice.getChannelById(channelInfo.id)
      .then((res) => {
        setMemberStatus(res.data)
      })
      .catch((err) => {})
  }, [])

  const joinChannelHandler = () => {
    const body: JoinChannel = {
      channelID: channelInfo.id,
    }

    if (channelInfo.visibility == "PROTECTED") body["password"] = password

    setProcessing(true)
    setErrorLog([])
    ChannelSevice.joinChannel(body)
      .then(({ data }: { data: ChannelUser }) => {
        channelInfo["role"] = "MEMBER"
        onJoin(channelInfo)
        socket?.emit("channelJoined", {
          token: cookieService.getJwtCookie(),
          data: data,
        })
      })
      .catch((err) => {
        setProcessing(false)
        setErrorLog(err.response.data.message)
      })
  }

  const lockEvent = (e: any) => {
    setLock(() => !lock)
  }

  return (
    <div className="animate__animated  animate__fadeIn gradient-border-2  p-4 rounded-xl">
      <div className="flex relative">
        <Avatar
          src={channelInfo.imageUrl}
          className="w-36 h-36 mx-auto m-5 mr-40 ml-40"
        />
      </div>
      <div className="flex flex-col justify-center align-middle">
        <h4 className="text-xl font-semibold self-center">
          {channelInfo.name}
        </h4>
        <p className="self-center">
          <span className="font-light text-sm mr-3">
            {memberStatus.channels?.length} Members
          </span>
          <span className="font-light text-sm text-primary-500">
            {
              memberStatus.channels?.filter(
                (item: any) => item.user.onlineStatus == true
              ).length
            }{" "}
            Online
          </span>
        </p>
      </div>
      {channelInfo.visibility == "PROTECTED" && (
        <Input
          placeholder="Password"
          icon={
            <Lock
              onClick={lockEvent}
              className="hover:scale-110 transition-transform"
            />
          }
          className="mt-6 w-80 h-11 bg-big-stone mx-auto"
          value={password}
          type={lock ? "password" : "text"}
          onChange={(e) => {
            setErrorLog([])
            setPassword(e.target.value)
          }}
        />
      )}
      {errorLog.length ? (
        <p className="font-light text-red-400 text-center mt-7 text-sm animate__animated animate__headShake">
          {errorLog}
        </p>
      ) : (
        <></>
      )}
      <div className="flex justify-center mt-6">
        <MainButton className="mb-2" onClick={joinChannelHandler}>
          {!processing ? (
            <p className="text-base font-semibold pt-4 pb-4 pr-8 pl-8 rounded-xl flex justify-center">
              Join Channel
            </p>
          ) : (
            <p className="text-base font-semibold pt-4 pb-4 pr-8 pl-8 rounded-xl flex justify-center">
              <span className="self-center channelCreateLoader"></span>
              <span className="self-center mx-3">Processing...</span>
            </p>
          )}
        </MainButton>
      </div>
    </div>
  )
}
