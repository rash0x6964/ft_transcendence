import Lobby from "@/models/Lobby.model"
import PlayersScore from "./PlayersScore"
import Game from "./Game"
import { useContext, useEffect, useRef, useState } from "react"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"

type Props = {
  className?: string
  lobby: Lobby
}
export default function GameLobby({ className, lobby }: Props) {
  const divRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [score, setScore] = useState<number[]>([0, 0])
  const socket = useContext(WebSocketContext)

  useEffect(() => {
    const updateDimensions = () => {
      setHeight(divRef.current!.clientHeight)
      setWidth(divRef.current!.clientWidth)
    }
    updateDimensions()
    const handleResize = () => {
      updateDimensions()
    }
    window.addEventListener("resize", handleResize)

    socket?.on("scoreChange", (data) => {
      setScore(data)
    })

    return () => {
      window.removeEventListener("resize", handleResize)
      socket?.off("scoreChange")
    }
  }, [])

  return (
    <div className={`w-full h-full flex flex-col ${className} `}>
      <div ref={divRef} className="w-full bg-secondary  h-[80%] border border-primary border-2">
        <Game width={width} height={height} />
      </div>
      <div className="flex-1  flex flex-col justify-center">
        <PlayersScore
          time="2:50"
          className="mx-auto"
          player1={lobby.players[0]}
          player2={lobby.players[1]}
          score={score}
        />
      </div>
    </div>
  )
}
