import Avatar from "@/components/BaseComponents/Avatar"
import Swords from "@/components/svgs/Swords"
import Lobby from "@/models/Lobby.model"
import lobby from "@/pages/game/lobby"

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
        <div className="flex  w-fit mx-auto gap-14 ">
          <div className="flex flex-col w-fit">
            <Avatar
              className="h-28 w-28 mb-3"
              src={lobby.players[0].avatarUrl}
            />
            <div className="mx-auto  text-sm">{lobby.players[0].userName}</div>
          </div>
          <div className="flex my-auto gap-4 mx-6">
            <h1 className="text-4xl">5</h1>
            <div className="flex flex-col">
              <Swords className="text-primary mb-1" width={50} height={50} />
              <div className="mx-auto text-slate-500 text-xs">2:50</div>
            </div>
            <h1 className="text-4xl">5</h1>
          </div>
          <div className="flex flex-col w-fit">
            <Avatar
              className="h-28 w-28 mb-3"
              src={lobby.players[1].avatarUrl}
            />
            <div className="mx-auto  text-sm">{lobby.players[1].userName}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
