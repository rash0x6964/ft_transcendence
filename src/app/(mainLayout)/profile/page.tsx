import PlayerInfoBar from "./(components)/(topSide)/PlayerInfoBar"
import Achievements from "./(components)/(achievements)/Achievements"
import MatchHistory from "./(components)/(matches)/MatchHistory"

export default function Page() {
  return (
    <div className="flex flex-col h-full">
      <div className="relative">
        <div className="m-10">
          <img
            className="rounded-[40px] w-[200%] h-72 -z-10 blur-[3px] object-cover"
            src="https://www.mobafire.com/images/champion/skins/landscape/yasuo-sea-dog-762x.jpg"
            alt="backdrop"
          />
        </div>
        <PlayerInfoBar />
      </div>
      <div className="flex container mx-auto overflow-y-scroll">
        <Achievements />
        <MatchHistory />
      </div>
    </div>
  )
}
