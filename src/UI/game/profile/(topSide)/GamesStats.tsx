import CenterProfile from "./CenterProfile"
import LevelCube from "./LevelCube"
import Stat from "./Stat"

export default function GamesStats() {
  const level = 8
  const percentage = 96

  return (
    <div className="flex items-center justify-around">
      <div className="flex h-fit gap-16">
        <Stat title="Total games" value="520" />
        <div className="bg-gray-700 h-16 my-auto w-[1px]"></div>
        <Stat title="Winrate" value="56%" />
        <div className="bg-gray-700 h-16 my-auto w-[1px]"></div>
        <Stat title="Longest winstreak" value="13" />
      </div>
      <CenterProfile />
      <LevelCube level={level} percentage={percentage} />
    </div>
  )
}