import { useEffect, useState } from "react"
import GamesStats from "./GamesStats"
import ProfileService from "@/services/ProfileService"
import Profile from "@/models/Profile.model"

export default function PlayerInfoBar() {
  const [profile, setProfile] = useState({} as Profile)

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await ProfileService.getCurrentProfile()
      const profile: Profile = result.data
      setProfile(profile)
    }

    fetchProfile()
  }, [])

  return (
    <div className="relative -top-24 bg-secondary rounded-[40px] -mb-24 m-10">
      <GamesStats profile={profile} />
    </div>
  )
}
