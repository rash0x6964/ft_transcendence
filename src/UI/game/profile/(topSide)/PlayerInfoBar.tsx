import { useEffect, useState } from "react"
import GamesStats from "./GamesStats"
import matchService from "@/services/MatchService"
import MatchesStats from "@/types/MatchesStats"
import ProfileData from "@/models/ProfileData.model"

type Props = {
  profileData: ProfileData
}

export default function PlayerInfoBar({ profileData }: Props) {
  const [stats, setStats] = useState<MatchesStats | null>(null)

  useEffect(() => {
    if (!profileData) return

    const fetchStats = async () => {
      try {
        const _stats = await matchService.getStatsById(profileData.id)
        setStats(_stats)
      } catch (error) {
        console.log("Couldn't fetch player stats")
      }
    }

    fetchStats()
  }, [profileData])

  if (!profileData || !stats) return <span className="loader"></span>
  else
    return (
      <div className="relative -top-24 bg-secondary rounded-[40px] -mb-24 m-10">
        <GamesStats profileData={profileData} stats={stats} />
      </div>
    )
}
