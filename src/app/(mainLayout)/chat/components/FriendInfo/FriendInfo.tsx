import Avatar from "@/components/BaseComponents/Avatar"
import Block from "@/components/svgs/Block"
import Unfriend from "@/components/svgs/Unfriend"
import Mute from "@/components/svgs/Mute"
import React from "react"

export default function FriendInfo() {
  return (
    <div className=" gradient-border-2 w-96 h-[465px] drop-shadow-lg flex flex-col items-center justify-around p-10">
      <Avatar
        src="https://steamavatar.io/img/1477351897dU2fO.jpg"
        className="w-40 h-40"
      />
      <p className="text-xl text-gray-300">K1NCH3RO</p>
      <p className="text-base text-slate-500 mb-10">8500 RP</p>
      <div className="flex w-full space justify-around ">
        <div className="flex flex-col gap-y-2">
          <div className="h-14 w-14 rounded-xl border border-gray-600 flex justify-center items-center">
            <Unfriend />
          </div>
          <p className="text-xs text-gray-500 self-center">Unfriend</p>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="h-14 w-14 rounded-xl border border-gray-600 flex justify-center items-center">
            <Block />
          </div>
          <p className="text-xs text-gray-500 self-center">Block</p>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="h-14 w-14 rounded-xl border border-gray-600 flex justify-center items-center">
            <Mute />
          </div>
          <p className="text-xs text-gray-500 self-center ">Mute</p>
        </div>
      </div>
    </div>
  )
}
