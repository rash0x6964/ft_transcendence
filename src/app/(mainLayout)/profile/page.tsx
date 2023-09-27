import Achievements from "./(components)/Achievements"
import MatchHistory from "./(components)/MatchHistory"
import PlayerInfoBar from "./(components)/PlayerInfoBar"


export default function Page() {
  return (
    <div className=" flex flex-col h-full">
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
      <div className="flex flex-1  container mx-auto overflow-y-scroll">
        <Achievements />
        <MatchHistory />
      </div>
    </div>
  )
}
