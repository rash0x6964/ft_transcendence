import Profile from "@/UI/settings/icons/Profile"
import BanLogo from "@/components/svgs/BanLogo"
import CloseBox from "@/components/svgs/CloseBox"
import React, { useState } from "react"
import UpdateRoomInfo from "./ChannelConf/UpdateRoomInfo"
import RoomSec from "./ChannelConf/RoomSec"
import DelRoom from "./ChannelConf/DelRoom"
import BannedList from "./ChannelConf/BannedList"

type Props = {
  onClick: (e: any) => void
  channelId: string
}

export default function ChannelSetting({ onClick, channelId }: Props) {
  const [selected, setSelectedBtn] = useState<"CHANNEL" | "BANLIST">("CHANNEL")

  return (
    <main
      className={
        "animate__animated  animate__fadeIn flex flex-col items-center w-screen h-screen"
      }
    >
      <div className="w-screen fixed h-screen  bg-gradient-to-br from-10% to-90% from-backdrop to-mirage -z-10"></div>
      <div className="flex justify-end w-full p-10">
        <CloseBox
          width={30}
          height={30}
          className="cursor-pointer"
          onClick={onClick}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-center">
        <div className="flex gap-2 w-52 flex-col mx-3">
          {/* nav btn */}
          <button
            className={
              "flex py-3 rounded-xl pl-3 hover:bg-selected" +
              (selected == "CHANNEL" ? " bg-selected" : " bg-secondary")
            }
            onClick={() => setSelectedBtn("CHANNEL")}
          >
            <Profile />
            <p className="pl-3">Channel</p>
          </button>
          <button
            className={
              "flex py-3 rounded-xl pl-3 hover:bg-selected" +
              (selected == "BANLIST" ? " bg-selected" : " bg-secondary")
            }
            onClick={() => setSelectedBtn("BANLIST")}
          >
            <BanLogo width={24} height={24} />
            <p className="pl-3">Ban list</p>
          </button>
        </div>
        <div className="w-[823px] flex flex-col gap-2">
          {selected == "CHANNEL" ? (
            <>
              <UpdateRoomInfo />
              <RoomSec />
              <DelRoom />
            </>
          ) : (
            <BannedList channelId={channelId}/>
          )}
        </div>
      </div>
    </main>
  )
}
