import Avatar from "@/components/BaseComponents/Avatar"
import Swords from "@/components/svgs/Swords"
import UserData from "@/models/UserData.model"
import PlayerResource from "./PlayerResource"

type Props = {
  player1: UserData
  player2: UserData
  time: string
  className?: string
  score: number[]
  mana: number[]
}
export default function PlayersScore({
  player1,
  player2,
  className,
  time,
  score,
  mana,
}: Props) {
  return (
    <div className={`flex  w-fit  gap-14 ${className} `}>
      <div className="flex flex-col w-fit">
        <Avatar className="h-28 w-28 mb-3" src={player1.avatarUrl} />
        <div className="mx-auto  text-sm">{player1.userName}</div>
        {mana && (
          <div className="mx-auto  text-sm">{`Mana: ${mana[0].toFixed(
            0
          )} / 3`}</div>
        )}
        {mana && <PlayerResource mana={mana[0]} />}
      </div>
      <div className="flex my-auto gap-4 mx-6">
        <h1 className="text-4xl">{score[0]}</h1>
        <div className="flex flex-col">
          <Swords className="text-primary mb-1" width={50} height={50} />
          <div className="mx-auto text-slate-500 text-xs">{time}</div>
        </div>
        <h1 className="text-4xl">{score[1]}</h1>
      </div>
      <div className="flex flex-col w-fit">
        <Avatar className="h-28 w-28 mb-3" src={player2.avatarUrl} />
        <div className="mx-auto  text-sm">{player2.userName}</div>
        {mana && (
          <div className="mx-auto  text-sm">{`Mana: ${mana[1].toFixed(
            0
          )} / 3`}</div>
        )}
        {mana && <PlayerResource mana={mana[1]} />}
      </div>
    </div>
  )
}
