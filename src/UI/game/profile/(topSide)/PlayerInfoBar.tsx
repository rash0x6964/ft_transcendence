import { useEffect, useState } from "react"
import GamesStats from "./GamesStats"
import matchService from "@/services/MatchService"
import MatchesStats from "@/types/MatchesStats"
import ProfileData from "@/models/ProfileData.model"
import LevelBar from "./LevelBar"
import CenterProfile from "./CenterProfile"
import Stat from "./Stat"
import profileService from "@/services/ProfileService"
import AchStat from "./AchStat"
import AchievementUser from "@/types/AchievementUser"
import achievementService from "@/services/AchievementService"
import Achievement from "@/models/Achievement.model"

type Props = {
  profileData: ProfileData
}

export default function PlayerInfoBar({ profileData }: Props) {
  const [stats, setStats] = useState<MatchesStats | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])

  useEffect(() => {
    if (!profileData) return

    const fetchStats = async () => {
      try {
        const _ach = await achievementService.getUserAchievementsById(
          profileData.id
        )
        const _stats = await matchService.getStatsById(profileData.id)
        setStats(_stats)
        setAchievements(_ach.slice(0, 3))
      } catch (error) {
        console.log("Couldn't fetch player stats")
      }
    }

    fetchStats()
  }, [profileData])

  if (!profileData || !stats) return <span className="loader"></span>
  else
    return (
      <div className="relative flex flex-col py-9 ">
        <div className=" flex justify-around mb-6">
          <div className="flex flex-1  justify-center gap-24">
            <Stat title="Total games" value={String(stats.total)} />
            <Stat
              title="Winrate"
              value={String(stats.winrate?.toFixed(0) || 0) + "%"}
            />
            <Stat title="Longest winstreak" value={String(stats.winstreak)} />
          </div>

          <CenterProfile
            avatarUrl={profileData.avatarUrl}
            rating={profileData.profile.rating}
            username={profileData.username}
          />

          <div className="flex flex-1 gap-24 justify-center">
            {achievements.map((ach) => {
              return <AchStat key={ach.id} achievement={ach} />
            })}
          </div>
        </div>
        <LevelBar
          className="flex px-20"
          percentage={profileService.calculatePercentage(profileData)}
          level={profileData.profile.level}
        />
      </div>
    )
}
