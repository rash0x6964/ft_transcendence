import NavButton from "@/UI/settings/NavButton"
import Cross from "@/UI/settings/icons/Cross"
import Game from "@/UI/settings/icons/Game"
import Profile from "@/UI/settings/icons/Profile"
import Security from "@/UI/settings/icons/Security"
import React from "react"



export default function ChannelSetting() {
  return (
    <main className={"flex flex-col items-center w-screen h-screen"}>
      <div className="w-screen fixed h-screen  bg-gradient-to-br from-10% to-90% from-backdrop to-mirage -z-10"></div>
      <div className="flex justify-end w-full p-10">
        <Cross />
      </div>
      <div className="flex  flex-col md:flex-row justify-center">
        <div className="flex gap-2 w-52 flex-col mx-3">
          <NavButton title="Profile" path="profile" icon={<Profile />} />
          <NavButton
            title="Sign in & Security"
            path="security"
            icon={<Security />}
          />
          <NavButton title="Game Prefrences" path="game" icon={<Game />} />
        </div>
        <div className="w-[823px]"></div>
      </div>
    </main>
  )
}
