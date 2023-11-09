"use client"
import UploadService from "@/services/Upload.service"
import React, { useState } from "react"
import Image from "next/image"
import Change from "@/UI/settings/icons/Change"
import Input from "@/components/BaseComponents/Input"
import Pen from "@/components/svgs/Pen"
import TVIcn from "@/components/svgs/TVIcn"
import Lock from "@/components/svgs/Lock"
import RadioGroup from "@/components/RadioGroup/RadioGroup"
import MainButton from "@/components/BaseComponents/MainButton"

export default function RoomSec() {
  const [visibility, setVisibility] = useState<
    "PRIVATE" | "PUBLIC" | "PROTECTED" | any
  >("PUBLIC")
  const options = ["Public", "Private"]

  const [currPassword, setCurrPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [errorLog, setErrorLog] = useState([])

  const [lock, setLock] = useState(true)
  const [lock_, setLock_] = useState(true)

  const onSave = () => {
    // let body: CreateChannel = {
    //   imageUrl:
    //     avatar != ""
    //       ? avatar
    //       : "https://i.pinimg.com/564x/7b/fa/54/7bfa549dcba2f80b494eb825f64527e1.jpg",
    //   name: channelName,
    //   visibility:
    //     visibility == "PUBLIC" && password.length ? "PROTECTED" : visibility,
    // };
    // if (body.visibility == "PROTECTED") body["password"] = password;
    // setErrorLog([]);
    // setProcessing(true);
    // ChannelSevice.createChannel(body)
    //   .then((res) => {
    //     createChannelEvent(res.data);
    //     handler();
    //   })
    //   .catch((err) => {
    //     setErrorLog(err.response.data.message);
    //     setProcessing(false);
    //   });
  }

  return (
    <div className="bg-secondary rounded-xl gradient-border-2 px-5 pb-5 flex flex-col gap-5">
      <p className="text-base my-5">Channel Sec</p>
      {visibility == "PUBLIC" ? (
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
        defaultVal={visibility}
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
