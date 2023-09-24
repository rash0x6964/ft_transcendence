import LevelCube from "./LevelCube"
import Stat from "./Stat"

export default function GamesStats() {
  return (
    <>
      <div className="flex">
        <Stat />
        <Stat />
        <Stat />
        <LevelCube />
      </div>
    </>
  )
}
