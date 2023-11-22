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
  const [mana, setMana] = useState<number[] | null>(null)
  const manaRef = useRef([0, 0])
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
      manaRef.current = data.mana
      lastUpdatedResource.current = data.lastUpdatedResource
    }

    socket?.on("scoreChange", handleScoreChange)

    const timerInterval = setInterval(() => {
      setTimer((Date.now() - lobby.gameData.gameStartDate) / 1000)
    }, 1000)

    let resourceInterval: NodeJS.Timeout | null = null
    if (lobby.mode === "Magician") {
      socket?.on("resourcesChange", handleResourcesChange)
      setMana([0, 0])
      resourceInterval = setInterval(() => {
        const _mana = [0, 0]
        _mana[0] =
          manaRef.current[0] + (Date.now() - lastUpdatedResource.current) / 1000
        _mana[1] =
          manaRef.current[1] + (Date.now() - lastUpdatedResource.current) / 1000
        if (_mana[0] > 3) _mana[0] = 3
        if (_mana[1] > 3) _mana[1] = 3
        if (_mana[0] < 3 || _mana[1] < 3) {
          setMana(_mana)
        }
      })
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      socket?.off("scoreChange", handleScoreChange)
      clearInterval(timerInterval)
      if (lobby.mode === "Magician" && resourceInterval) {
        clearInterval(resourceInterval)
        socket?.off("resourcesChange", handleResourcesChange)
      }
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
