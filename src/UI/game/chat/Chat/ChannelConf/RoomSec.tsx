"use client"
import React, { useContext, useEffect, useState } from "react"
import Input from "@/components/BaseComponents/Input"
import Lock from "@/components/svgs/Lock"
import RadioGroup from "@/components/RadioGroup/RadioGroup"
import MainButton from "@/components/BaseComponents/MainButton"
import { Channel } from "@/models/Channel.model"
import ChannelSevice from "@/services/Channel.sevice"
import { NotifcationContext } from "@/UI/NotificationProvider"

type Props = {
  selectedChannel: Channel
  // updateSelectedChannel: (data: any) => void
}

export default function RoomSec({
  selectedChannel,
  // updateSelectedChannel,
}: Props) {
  const [visibility, setVisibility] = useState<
    "PRIVATE" | "PUBLIC" | "PROTECTED" | any
  >("PUBLIC")
  const options = ["Public", "Private"]

  const [currPassword, setCurrPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [errorLog, setErrorLog] = useState([])

  const [lock, setLock] = useState(true)
  const [lock_, setLock_] = useState(true)

  useEffect(() => {
    setVisibility(selectedChannel.visibility)
    console.log(visibility)
  }, [])

  const notify = useContext(NotifcationContext)

  const onSave = () => {
    // check if the old password is correct
    // currPassword
    // if (visibility == "PROTECTED") {
    //   currPassword ==
    // }

    let body: any = {
      id: selectedChannel.id,
      visibility:
        visibility == "PUBLIC" && newPassword != ""
          ? "PROTECTED"
          : visibility == "PROTECTED" && newPassword == ""
          ? "PUBLIC"
          : visibility,
    }

    if (newPassword != "") body["password"] = newPassword

    setErrorLog([])
    ChannelSevice.updateChannel(body)
      .then((res) => {
        notify({
          message: "Saved successfully",
          title: "Updated Channel Sec",
          type: "success",
        })
        // updateSelectedChannel(res.data)
      })
      .catch((err) => {
        // console.log(err)
        setErrorLog(err)
      })
  }

  return (
    <div className="bg-secondary rounded-xl gradient-border-2 px-5 pb-5 flex flex-col gap-5">
      <p className="text-base my-5">Channel Sec</p>
      {visibility == "PUBLIC" || visibility == "PROTECTED" ? (
        <>
          <Input
            placeholder="Current password"
            icon={
              <Lock
                onClick={() => setLock_((prevLock) => !prevLock)}
                className="hover:scale-110 transition-transform"
              />
            }
            className="w-80 h-11 bg-big-stone"
            value={currPassword}
            type={lock_ ? "password" : "text"}
            onChange={(e) => setCurrPassword(e.target.value)}
          />

          <Input
            placeholder="New passowrd"
            icon={
              <Lock
                onClick={() => setLock((prevLock) => !prevLock)}
                className="hover:scale-110 transition-transform"
              />
            }
            className="w-80 h-11 bg-big-stone"
            value={newPassword}
            type={lock ? "password" : "text"}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </>
      ) : (
        <></>
      )}
      <RadioGroup
        defaultVal={
          visibility.toLowerCase().charAt(0).toUpperCase() +
          visibility.toLowerCase().slice(1)
        }
        radios={options}
        onChange={(value) => setVisibility(value.toUpperCase())}
        className="flex gap-10"
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
