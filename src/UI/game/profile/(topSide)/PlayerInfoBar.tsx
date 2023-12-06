import MatchesStats from "@/types/MatchesStats"
import ProfileData from "@/models/ProfileData.model"
import LevelBar from "./LevelBar"
import CenterProfile from "./CenterProfile"
import Stat from "./Stat"
import profileService from "@/services/ProfileService"
import AchStat from "./AchStat"
import Achievement from "@/models/Achievement.model"

type Props = {
  profileData: ProfileData | null
  stats: MatchesStats | null
  achievements: Achievement[]
}

export default function PlayerInfoBar({
  profileData,
  stats,
  achievements,
}: Props) {
  if (!profileData || !stats) return <></>
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
