import Avatar from "@/components/BaseComponents/Avatar"
import Swords from "@/components/svgs/Swords"
import UserData from "@/models/UserData.model"
import lobby from "@/pages/game/lobby"

type Props = {
  player1: UserData
  player2: UserData
  time: string
  className?: string
}
export default function PlayersScore({
  player1,
  player2,
  className,
  time,
}: Props) {
  return (
    <div className={`flex  w-fit  gap-14 ${className} `}>
      <div className="flex flex-col w-fit">
        <Avatar className="h-28 w-28 mb-3" src={player1.avatarUrl} />
        <div className="mx-auto  text-sm">{player1.userName}</div>
      </div>
      <div className="flex my-auto gap-4 mx-6">
        <h1 className="text-4xl">5</h1>
        <div className="flex flex-col">
          <Swords className="text-primary mb-1" width={50} height={50} />
          <div className="mx-auto text-slate-500 text-xs">{time}</div>
        </div>
        <h1 className="text-4xl">5</h1>
      </div>
      <div className="flex flex-col w-fit">
        <Avatar className="h-28 w-28 mb-3" src={player2.avatarUrl} />
        <div className="mx-auto  text-sm">{player2.userName}</div>
      </div>
    </div>
  )
}
