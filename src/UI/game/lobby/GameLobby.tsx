import Lobby from "@/models/Lobby.model"
import PlayersScore from "./PlayersScore"
import Game from "./Game"
import { useContext, useEffect, useRef, useState } from "react"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import { useRouter } from "next/router"
import { timePipe } from "@/pipes/date.pipes"
import PlayerResource from "./PlayerResource"

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
  const [resource, setResource] = useState<number>(0)
  const [mana, setMana] = useState<number>(0)
  const lastUpdatedResource = useRef(Date.now())
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

    const handleScoreChange = (data: any) => {
      setScore(data)
    }

    const handleResourcesChange = (data: any) => {
      setResource(data)
      lastUpdatedResource.current = Date.now()
    }

    socket?.on("scoreChange", handleScoreChange)
    socket?.on("resourcesChange", handleResourcesChange)

    const timerInterval = setInterval(() => {
      setTimer((Date.now() - lobby.gameData.gameStartDate) / 1000)
    }, 1000)

    const resourceInterval = setInterval(() => {
      const _mana = mana + (Date.now() - lastUpdatedResource.current) / 10 / 60
      if (_mana < 3) {
        setMana(_mana)
      }
    })

    return () => {
      window.removeEventListener("resize", handleResize)
      socket?.off("scoreChange", handleScoreChange)
      socket?.off("resourcesChange", handleResourcesChange)
      clearInterval(timerInterval)
      clearInterval(resourceInterval)
    }
  }, [])

  return (
    <div className={`w-full h-full flex flex-col ${className} `}>
      <div
        ref={divRef}
        className="w-full bg-secondary  h-[80%]  border-primary border-2"
      >
        <Game width={width} height={height} />
      </div>
      <PlayersScore
        time={timePipe(timer)}
        className="mx-auto"
        player1={lobby.players[0]}
        player2={lobby.players[1]}
        score={score}
        mana={mana}
      />
    </div>
  )
}
