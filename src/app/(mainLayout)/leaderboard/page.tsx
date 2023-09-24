import Trophy from "@/components/svgs/Trophy"
import RP from "@/components/svgs/RP"

export default function page() {
  return (
    <div className="flex flex-col gap-5 container">
      <div className="flex justify-around">
        <div className="flex flex-col gap-2">
          <div className="self-center">
            <img
              className="rounded-full border-4"
              src="https://steamavatar.io/img/1477742918oUeJT.jpg"
              alt=""
            />
            <span className="rounded-full border-4 ">2</span>
          </div>
          <span className="self-center">ghalix</span>
          <div className="flex gap-3 self-center">
            <RP />
            <span className="">8500 RP</span>
          </div>
        </div>
      </div>

      <div>
        <div className="h-14 w-fill flex justify-around text-sm text-slate-600 ">
          <span className="self-center">Rank</span>
          <span className="self-center">Player</span>
          <span className="self-center">Rating</span>
          <span className="self-center">Winrate</span>
          <span className="self-center">Game</span>
        </div>
        <div className="h-14 w-fill bg-secondary shadow-md rounded-lg flex justify-around text-sm">
          {/* Rank */}
          <div className="self-center flex gap-3">
            <Trophy />
            <span className="self-center">4</span>
          </div>

          {/* player */}
          <div className="self-center flex gap-3">
            <img
              className="rounded-full w-8"
              src="https://steamavatar.io/img/1477742991jR2Uh.jpg"
              alt=""
            />
            <span className="self-center">KINCH3RO</span>
          </div>

          {/* Rating */}
          <div className="self-center flex gap-3">
            <RP />
            <span className="self-center">8500 RP</span>
          </div>

          {/* Winrate */}
          <div className="self-center flex gap-3">
            <span>50 %</span>
          </div>

          {/* Game */}
          <div className="self-center flex gap-3">
            <span>512</span>
          </div>
        </div>
      </div>
    </div>
  )
}
