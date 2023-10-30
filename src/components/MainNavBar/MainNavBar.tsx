"use client"
import React, { useEffect, useState } from "react"
import PlayerName from "./PlayerName"
import PlayerCoins from "./PlayerCoins"
import NavHistory from "./NavHistory"
import PlayerRP from "./PlayerRP"
import Logo from "../svgs/Logo"
import SettingsButton from "./SettingsButton"
import PlayerLevel from "./PlayerLevel"
import Profile from "@/models/Profile.model"
import profileService from "@/services/ProfileService"
import User from "@/models/User.model"
import { getCurrent } from "@/services/UsersService"
type Props = {
  coins: number
  className: string
}

export default function MainNavBar({ coins, className }: Props) {
  const [profile, setProfile] = useState({} as Profile)
  const [userData, setUserData] = useState({} as User)

  useEffect(() => {
    const fetchProfile = async () => {
      const _profile = await profileService.getCurrentProfile()
      setProfile(_profile)
    }

    const fetchUserData = async () => {
      const _user = await getCurrent()
      setUserData(_user)
    }

    fetchProfile()
    fetchUserData()
    // fetchLatestMatches()
  }, [])

  let history: boolean[] = [true, true, false, false, true]
  let RP: number = 10050
  const percentage = 50

  return (
    <div className={` flex justify-between py-3 px-7 mb-4 ${className}`}>
      <Logo width={24} height={24} className="text-primary my-auto" />
      <div className="bg-transparent-500  flex justify-center flex-row-reverse  h-fit gap-12">
        <PlayerName src={userData.avatarUrl} name={userData.userName} />
        <PlayerCoins className="my-auto" coins={profile.coins} />
        <NavHistory className="my-auto" history={history} />
        <PlayerLevel
          className="my-auto"
          level={profile.level}
          percentage={percentage}
        />
        <PlayerRP className="my-auto" RP={profile.rating} />
      </div>
      <SettingsButton className="my-auto text-white hover:text-white/50 duration-500" />
    </div>
  )
}
