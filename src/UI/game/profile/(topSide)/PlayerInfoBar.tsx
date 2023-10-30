import { useEffect, useState } from "react"
import GamesStats from "./GamesStats"
import matchService from "@/services/MatchService"
import MatchesStats from "@/types/MatchesStats"
import profileService from "@/services/ProfileService"
import ProfileData from "@/models/ProfileData.model"

type Props = {
  username: string
}

export default function PlayerInfoBar({ username }: Props) {
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [stats, setStats] = useState({} as MatchesStats)

  useEffect(() => {
    if (!username) return

    const fetchProfileData = async () => {
      const _profileData = await profileService.getProfileDataByUsername(
        username
      )
      setProfileData(_profileData)
    }

    const fetchStats = async () => {
      const _stats = await matchService.getStats()
      setStats(_stats)
    }

    fetchProfileData()
    fetchStats()
  }, [username])

  if (!profileData) return <div>Loading ...</div>
  else
    return (
      <div className="relative -top-24 bg-secondary rounded-[40px] -mb-24 m-10">
        <GamesStats profileData={profileData} stats={stats} />
      </div>
    )
}
