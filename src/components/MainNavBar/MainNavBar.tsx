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
import userService from "@/services/UsersService"
import matchService from "@/services/MatchService"
import Match from "@/models/Match.model"
import Link from "next/link"
type Props = {
  coins: number
  className: string
}

export default function MainNavBar({ coins, className }: Props) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [userData, setUserData] = useState<User | null>(null)
  const [latestMatches, setLatestMatches] = useState<Match[]>([])

  useEffect(() => {
    const fetchProfile = async () => {
      const _profile = await profileService.getCurrentProfile()
      setProfile(_profile)
    }

    const fetchUserData = async () => {
      const _user = await userService.getCurrent()
      setUserData(_user)
    }

    const fetchLatestMatches = async () => {
      const _matches = await matchService.getLatestMatches(5)
      setLatestMatches(_matches)
    }

    fetchProfile()
    fetchUserData()
    fetchLatestMatches()
  }, [])

  const percentage = 50

  if (!profile || !userData || !latestMatches)
    return <span className="loader"></span>
  else
    return (
      <div className={` flex justify-between py-3 px-7 mb-4 ${className}`}>
        <Link href="/game/profile/wow">
          <Logo width={24} height={24} className="text-primary my-auto" />
        </Link>
        <div className="bg-transparent-500  flex justify-center flex-row-reverse  h-fit gap-12">
          <PlayerName src={userData.avatarUrl} name={userData.userName} />
          <PlayerCoins className="my-auto" coins={profile.coins} />
          <NavHistory
            className="my-auto"
            matches={latestMatches}
            id={userData.id}
          />
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
