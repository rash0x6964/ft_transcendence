"use client"
import UploadService from "@/services/Upload.service"
import React, { useContext, useState } from "react"
import Image from "next/image"
import Change from "@/UI/settings/icons/Change"
import Input from "@/components/BaseComponents/Input"
import Pen from "@/components/svgs/Pen"
import MainButton from "@/components/BaseComponents/MainButton"
import ChannelSevice from "@/services/Channel.sevice"
import { Channel } from "@/models/Channel.model"
import { NotifcationContext } from "@/UI/NotificationProvider"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import CookiesService from "@/services/CookiesService"

type Props = {
  selectedChannel: Channel
}

export default function DelRoom({
  selectedChannel,
}: Props) {
  const socket = useContext(WebSocketContext)
  const [channelName, setChannelName] = useState("")
  const [errorLog, setErrorLog] = useState([""])

  const notify = useContext(NotifcationContext)

  const onDelete = () => {
    setErrorLog([])

    if (channelName != selectedChannel.name) {
      setErrorLog(["Channel name is wrong"])
      return
    }

    ChannelSevice.deleteChannel(selectedChannel.id)
      .then((res) => {
        notify({
          message: "channel was deleted successfully",
          title: "Delete Channel",
          type: "success",
        })
        socket?.emit("deleteChannel", {
          token: CookiesService.getJwtCookie(),
          data: selectedChannel,
        })
      })
      .catch((err) => {
        setErrorLog(err)
      })
  }

  return (
    <div className="bg-secondary rounded-xl gradient-border-2 px-5 pb-5 flex flex-col gap-5">
      <p className="text-base py-5">Channel Deletion</p>
      <Input
        placeholder="Channel name"
        icon={<Pen />}
        value={channelName ?? ""}
        onChange={(e) => setChannelName(e.target.value)}
        className="bg-big-stone w-[332px] min-w-[300px] h-11  "
      />
      {errorLog.length ? (
        <p className="font-light text-red-400 text-center text-sm animate__animated animate__headShake">
          {errorLog}
        </p>
      ) : (
        <></>
      )}
      <MainButton className="self-end bg-red-500 text-white" onClick={onDelete}>
        <p className="font-normal pt-3 pb-3 pr-8 pl-8 rounded-xl flex justify-center">
          Delete
        </p>
      </MainButton>
    </div>
  )
}
