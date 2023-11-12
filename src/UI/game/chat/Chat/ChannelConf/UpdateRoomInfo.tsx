"use client"
import UploadService from "@/services/Upload.service"
import React, { useContext, useEffect, useState } from "react"
import Image from "next/image"
import Change from "@/UI/settings/icons/Change"
import Input from "@/components/BaseComponents/Input"
import Pen from "@/components/svgs/Pen"
import MainButton from "@/components/BaseComponents/MainButton"
import { Channel } from "@/models/Channel.model"
import ChannelSevice from "@/services/Channel.sevice"
import { NotifcationContext } from "@/UI/NotificationProvider"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import cookieService from "@/services/CookiesService"
import axios from "axios"

type Props = {
  selectedChannel: Channel
}

export default function UpdateRoomInfo({ selectedChannel }: Props) {
  const socket = useContext(WebSocketContext)
  const [avatar, setAvatar] = useState("")
  const [channelName, setChannelName] = useState("")
  const [errorLog, setErrorLog] = useState([])

  const notify = useContext(NotifcationContext)

  useEffect(() => {
    setAvatar(selectedChannel.imageUrl)
    setChannelName(selectedChannel.name)
  }, [])

  const onSave = () => {
    let body: any = {
      id: selectedChannel.id,
      imageUrl: avatar,
      name: channelName,
    }

    setErrorLog([])
    ChannelSevice.updateChannel(body)
      .then((res) => {
        notify({
          message: "Saved successfully",
          title: "Updated Channel",
          type: "success",
        })
        selectedChannel = { ...res.data }
        socket?.emit("updateChannelInfo", {
          token: cookieService.getJwtCookie(),
          data: res.data,
        })
      })
      .catch((err) => {
        setErrorLog(err)
      })
  }

  const uploadPic = (url: string) => {
    let body: any = {
      id: selectedChannel.id,
      imageUrl: url,
    }
    return ChannelSevice.updateChannel(body)
  }

  const onFileChange = async (e: any) => {
    if (!e.target.files[0]) return
    const formdata = new FormData()
    formdata.append("files", e.target.files[0], e.target.files[0].name)
    try {
      const res = await UploadService.uploadFiles("avatars", formdata)
      const channel = await uploadPic(res.data[0].url)
      // console.log('test', channel)
      setAvatar(channel.data.imageUrl)
      selectedChannel = { ...channel.data }
      socket?.emit("updateChannelInfo", {
        token: cookieService.getJwtCookie(),
        data: channel.data,
      })
    } catch (err) {
        if (axios.isAxiosError(err)) {
          notify({
            message: err.response?.data?.message,
            title: "Validation Error",
            type: "error",
          })
        }
    }
  }

  return (
    <div className="bg-secondary rounded-xl gradient-border-2 px-5 pb-5 flex flex-col">
      <p className="text-base py-5">Channel Info</p>
      <div className="relative rounded-full w-36 h-36 flex flex-col justify-center border-gray-500 border-2 bg-[#D9D9D9]">
        <Image
          width={680}
          height={128}
          src={avatar}
          alt="avatar"
          className="w-[680px] h-36  object-cover  mx-auto rounded-full border-2"
        />
        <div className="absolute w-7 h-7 bg-gray-200 rounded-full items-center flex border-gray-500 overflow-hidden right-2 bottom-2">
          <Change className="cursor-pointer w-8 h-8" />
          <input
            type="file"
            className="opacity-0 rounded-full cursor-pointer absolute"
            onChange={onFileChange}
            name="avatars"
          ></input>
        </div>
      </div>
      <Input
        placeholder="Channel name"
        icon={<Pen />}
        value={channelName ?? ""}
        onChange={(e) => setChannelName(e.target.value)}
        className="bg-big-stone w-[332px] min-w-[300px] h-11  my-5"
      />
      {errorLog.length ? (
        <p className="font-light text-red-400 text-center text-sm animate__animated animate__headShake">
          {errorLog}
        </p>
      ) : (
        <></>
      )}
      <MainButton className="self-end" onClick={onSave}>
        <p className="font-light pt-3 pb-3 pr-8 pl-8 rounded-xl flex justify-center">
          Save
        </p>
      </MainButton>
    </div>
  )
}
function notify(arg0: { message: string; title: string; type: string }) {
  throw new Error("Function not implemented.")
}
