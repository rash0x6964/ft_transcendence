import PlayerLevel from "@/components/MainNavBar/PlayerLevel"
import CenterProfile from "./CenterProfile"
import LevelCube from "./LevelCube"
import Stat from "./Stat"

export default function GamesStats() {
  const level = 10
  const percentage = 50

  return (
    <>
      <div className="flex items-center justify-around">
        <div className="flex gap-16">
          <Stat title="Total games" value="520" />
          <Stat title="Winrate" value="56%" />
          <Stat title="Longest winstreak" value="13" />
        </div>
        <CenterProfile />
        <LevelCube level={level} percentage={percentage} />
      </div>
    </>
  )
}
