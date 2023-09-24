import CenterProfile from "./CenterProfile"
import LevelCube from "./LevelCube"
import Stat from "./Stat"

export default function GamesStats() {
  return (
    <>
      <div className="flex">
        <Stat />
        <Stat />
        <Stat />
        <CenterProfile />
        <LevelCube />
      </div>
    </>
  )
}
