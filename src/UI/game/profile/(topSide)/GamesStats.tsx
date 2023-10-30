import ProfileData from "@/models/ProfileData.model"
import CenterProfile from "./CenterProfile"
import LevelCube from "./LevelCube"
import Stat from "./Stat"
import MatchesStats from "@/types/MatchesStats"

type Props = {
  profileData: ProfileData
  stats: MatchesStats
}

export default function GamesStats({ profileData, stats }: Props) {
  const level = profileData.profile.level
  const percentage = 96

  return (
    <div className="flex items-center justify-around">
      <div className="flex h-fit gap-16">
        <Stat title="Total games" value={String(stats.total)} />
        <div className="bg-gray-700 h-16 my-auto w-[1px]"></div>
        <Stat title="Winrate" value={String(stats.winrate) + "%"} />
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
