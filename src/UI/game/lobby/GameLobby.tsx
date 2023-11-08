import Avatar from "@/components/BaseComponents/Avatar"
import Swords from "@/components/svgs/Swords"
import Lobby from "@/models/Lobby.model"
import lobby from "@/pages/game/lobby"
import PlayersScore from "./PlayersScore"
import Game from "./Game"
import { useEffect, useRef, useState } from "react"

type Props = {
  className?: string
  lobby: Lobby
}
export default function GameLobby({ className, lobby }: Props) {
  const canvasRef = useRef(null)
  const [w, setW] = useState<number>(0)
  const [h, setH] = useState<number>(0)

  useEffect(() => {
    setH(canvasRef.current.clientHeight)
    setW(canvasRef.current.clientWidth)
    const handleResize = (e) => {
      setH(canvasRef.current.clientHeight)
      setW(canvasRef.current.clientWidth)
    }
    window.onresize = handleResize

    return () => {
      window.onresize = null
    }
  }, [])

  return (
    <div className={`w-full h-full flex flex-col ${className} `}>
      <div ref={canvasRef} className="w-full bg-secondary  h-[80%]">
        <Game width={w} height={h} />
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
