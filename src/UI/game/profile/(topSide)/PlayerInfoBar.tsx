import { useEffect, useState } from "react"
import GamesStats from "./GamesStats"
import ProfileService from "@/services/ProfileService"
import Profile from "@/models/Profile.model"
import User from "@/models/User.model"
import { getCurrent } from "@/services/UsersService"

export default function PlayerInfoBar() {
  const [profile, setProfile] = useState({} as Profile)
  const [userData, setUserData] = useState({} as User)

  useEffect(() => {
    const fetchProfile = async () => {
      const _profile = await ProfileService.getCurrentProfile()
      const _userData = await getCurrent()
      setProfile(_profile)
      setUserData(_userData)
    }

    fetchProfile()
  }, [])

  return (
    <div className="relative -top-24 bg-secondary rounded-[40px] -mb-24 m-10">
      <GamesStats profile={profile} userData={userData} />
    </div>
  )
}
