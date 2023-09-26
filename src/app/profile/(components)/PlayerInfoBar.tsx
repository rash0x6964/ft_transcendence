import GamesStats from "./GamesStats"

export default function PlayerInfoBar() {
  return (
    <>
      <div className="relative -top-24 bg-secondary rounded-[40px] -mb-12 m-10 mb-2">
        <GamesStats />
      </div>
    </>
  )
}
