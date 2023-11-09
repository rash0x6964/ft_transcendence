"use client"
import UploadService from "@/services/Upload.service"
import React, { useState } from "react"
import Image from "next/image"
import Change from "@/UI/settings/icons/Change"
import Input from "@/components/BaseComponents/Input"
import Pen from "@/components/svgs/Pen"
import MainButton from "@/components/BaseComponents/MainButton"

export default function DelRoom() {
  const [channelName, setChannelName] = useState("")
  const [errorLog, setErrorLog] = useState([])

  const onDelete = () => {
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
        <p className="font-light pt-3 pb-3 pr-8 pl-8 rounded-xl flex justify-center">
          Delete
        </p>
      </MainButton>
    </div>
  )
}
