"use client"
import React from "react"
import PlayerName from "./PlayerName"
import PlayerCoins from "./PlayerCoins"
import NavHistory from "./NavHistory"
import PlayerRP from "./PlayerRP"
import Settings from "../svgs/Settings"

import SettingsButton from "./SettingsButton"
import PlayerLevel from "./PlayerLevel"
type Props = {
  coins: number
}

export default function MainNavBar({ coins }: Props) {
  let history: boolean[] = [true, true, false, false, true]
  let RP: number = 10050

  return (
    <div className="flex justify-between py-3 px-7">
      <Settings className="text-white my-auto" width={25} height={25} />
      <div className="bg-transparent-500  flex justify-center flex-row-reverse  h-fit gap-12">
        <PlayerName
          src="https://steamavatar.io/img/14777429717elSu.jpg"
          name="rash0x6964"
        />
        <PlayerCoins className="my-auto" coins={coins} />
        <NavHistory className="my-auto" history={history} />
        <PlayerLevel className="my-auto" level={10} percentage={50} />
        <PlayerRP className="my-auto" RP={10500} />
      </div>
      <SettingsButton
        className="my-auto text-white hover:text-white/50 duration-500"
        onClick={() => alert("asd")}
      />
    </div>
  )
}
