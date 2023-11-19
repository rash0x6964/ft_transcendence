import Lobby from "@/models/Lobby.model"
import PlayersScore from "./PlayersScore"
import Game from "./Game"
import { useContext, useEffect, useRef, useState } from "react"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import { useRouter } from "next/router"
import { timePipe } from "@/pipes/date.pipes"

type Props = {
  className?: string
  lobby: Lobby
}
export default function GameLobby({ className, lobby }: Props) {
  const divRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [score, setScore] = useState<number[]>([0, 0])
  const [timer, setTimer] = useState<number>(0)
  const socket = useContext(WebSocketContext)
  const router = useRouter()

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

    socket?.on("timerChange", (data) => {
      setTimer(data)
    })

    socket?.on("gameEnd", (lobby, rewards) => {
      window.sessionStorage.setItem(
        "endGameData",
        JSON.stringify({ lobby, ...rewards })
      )
      router.push("/game/endGame")
    })

    return () => {
      window.removeEventListener("resize", handleResize)
      socket?.off("scoreChange")
      socket?.off("gameEnd")
    }
  }, [])

  return (
    <div className={`w-full h-full flex flex-col ${className} `}>
      <div
        ref={divRef}
        className="w-full bg-secondary  h-[80%] border border-primary border-2"
      >
        <Game width={width} height={height} />
      </div>
      <div className="flex-1  flex flex-col justify-center">
        <PlayersScore
          time={timePipe(timer)}
          className="mx-auto"
          player1={lobby.players[0]}
          player2={lobby.players[1]}
          score={score}
        />
      </div>
    </div>
  )
}
