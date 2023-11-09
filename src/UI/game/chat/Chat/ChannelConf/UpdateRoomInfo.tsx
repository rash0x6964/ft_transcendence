"use client"
import UploadService from "@/services/Upload.service"
import React, { useState } from "react"
import Image from "next/image"
import Change from "@/UI/settings/icons/Change"
import Input from "@/components/BaseComponents/Input"
import Pen from "@/components/svgs/Pen"
import MainButton from "@/components/BaseComponents/MainButton"

export default function UpdateRoomInfo() {
  const [avatar, setAvatar] = useState("")
  const [channelName, setChannelName] = useState("")
  const [errorLog, setErrorLog] = useState([])

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

  const onFileChange = (e: any) => {
    if (!e.target.files[0]) return
    const formdata = new FormData()
    formdata.append("files", e.target.files[0], e.target.files[0].name)
    UploadService.uploadFiles("avatars", formdata)
      .then((res) => {
        setAvatar(res.data[0].url)
      })
      .catch((err) => {
        console.log(err.data)
      })
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
