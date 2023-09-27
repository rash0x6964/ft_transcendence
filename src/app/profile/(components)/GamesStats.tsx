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
        <div className="flex">
          <Stat />
          <Stat />
          <Stat />
        </div>
        <CenterProfile />
        <LevelCube level={level} percentage={percentage} />
      </div>
    </>
  )
}
