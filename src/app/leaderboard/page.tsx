import Podium from "./(components)/Podium"
import TableRow from "./(components)/TableRow"

export default function page() {
  return (
    <div className="mx-auto flex flex-col gap-5 container">
      <div className="flex gap-5 justify-around">
        <div></div>
        <Podium
          playerAvatar="https://steamavatar.io/img/1477742918oUeJT.jpg"
          playerName="rash"
          position={1}
          rp={8500}
        />

        <Podium
          playerAvatar="https://steamavatar.io/img/1477742918oUeJT.jpg"
          playerName="ghali"
          position={2}
          rp={8500}
        />

        <Podium
          playerAvatar="https://steamavatar.io/img/1477742918oUeJT.jpg"
          playerName="samini"
          position={3}
          rp={8500}
        />
        <div className="order-5"></div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-14 w-fill flex justify-around text-sm text-slate-600 ">
          <span className="self-center">Rank</span>
          <span className="self-center">Player</span>
          <span className="self-center">Rating</span>
          <span className="self-center">Winrate</span>
          <span className="self-center">Game</span>
        </div>
        <TableRow
          nbGame={510}
          playerAvatar="https://steamavatar.io/img/1477742911B8IH3.jpg"
          playerName="KINSHIRO"
          rank={4}
          rp={8500}
          winrate={50}
        />
        <TableRow
          nbGame={510}
          playerAvatar="https://steamavatar.io/img/1477742911B8IH3.jpg"
          playerName="KINSHIRO"
          rank={4}
          rp={8500}
          winrate={50}
        />
        <TableRow
          nbGame={510}
          playerAvatar="https://steamavatar.io/img/1477742911B8IH3.jpg"
          playerName="KINSHIRO"
          rank={4}
          rp={8500}
          winrate={50}
        />
      </div>
    </div>
  )
}
