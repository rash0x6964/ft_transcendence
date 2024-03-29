import ProfileData from "@/models/ProfileData.model"
import CenterProfile from "./CenterProfile"
import LevelCube from "./LevelCube"
import Stat from "./Stat"
import MatchesStats from "@/types/MatchesStats"
import profileService from "@/services/ProfileService"

type Props = {
  profileData: ProfileData
  stats: MatchesStats | null
}

export default function GamesStats({ profileData, stats }: Props) {
  const level = profileData.profile.level
  const percentage = profileService.calculatePercentage(profileData)

  if (!profileData || !stats) return <span className="loader"></span>
  return (
    <div className="flex items-center justify-around">
      <div className="flex h-fit gap-16">
        <Stat title="Total games" value={String(stats.total)} />
        <div className="bg-gray-700 h-16 my-auto w-[1px]"></div>
        <Stat
          title="Winrate"
          value={String(stats.winrate?.toFixed(0) || 0) + "%"}
        />
        <div className="bg-gray-700 h-16 my-auto w-[1px]"></div>
        <Stat title="Longest winstreak" value={String(stats.winstreak)} />
      </div>
      <CenterProfile
        avatarUrl={profileData.avatarUrl}
        rating={profileData.profile.rating}
        username={profileData.username}
      />
      <LevelCube level={level} percentage={percentage} />
    </div>
  )
}
