import Avatar from "@/components/BaseComponents/Avatar"
import Swords from "@/components/svgs/Swords"
import Lobby from "@/models/Lobby.model"
import lobby from "@/pages/game/lobby"
import PlayersScore from "./PlayersScore"

type Props = {
  className?: string
  lobby: Lobby
}
export default function GameLobby({ className, lobby }: Props) {
  return (
    <div className={`w-full h-full flex flex-col ${className} `}>
      {/* just an example */}
      <div className="w-full bg-secondary border-2 border-primary h-[80%] rela">
        <div className="absolute ml-2 top-20 h-fit">
          <div className="w-6  h-40 relative">
            <div className="w-full h-full blur-[4px] bg-primary absolute"></div>
            <div className="w-full h-full ab bg-primary "></div>
          </div>
        </div>
        <div className="absolute mr-2  right-0 top-80">
          <div className="w-6  h-40 relative">
            <div className="w-full h-full blur-[4px] bg-primary absolute"></div>
            <div className="w-full h-full ab bg-primary "></div>
          </div>
        </div>
        <div className="h-full w-[2px] bg-primary mx-auto"></div>
      </div>
      <div className="flex-1  flex flex-col justify-center">
        <PlayersScore
          time="2:50"
          className="mx-auto"
          player1={lobby.players[0]}
          player2={lobby.players[1]}
        />
      </div>
    </div>
  )
}
