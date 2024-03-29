import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { WebSocketContext } from "./WebSocketContextWrapper"
import { NotifcationContext } from "./NotificationProvider"
import CookiesService from "@/services/CookiesService"
import Lobby from "@/models/Lobby.model"
import { useRouter } from "next/router"
import ProfileData from "@/models/ProfileData.model"
import QueueData from "@/types/QueueData"

export const LobbyContext = createContext<any | null>(null)
export default function LobbyProvider({ children }: PropsWithChildren) {
  const notify = useContext(NotifcationContext)
  const router = useRouter()
  const [lobby, setLobby] = useState<Lobby | null>(null)
  const [timer, setTimer] = useState(0)
  const [startingTimer, setStartingTimer] = useState(5)
  const [inQueue, setInQueue] = useState(false)

  const socket = useContext(WebSocketContext)

  useEffect(() => {
    if (!inQueue) {
      setTimer(0)
      return
    }

    const interval = setInterval(() => {
      setTimer((prevState) => prevState + 1)
    }, 1000)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [inQueue])

  useEffect(() => {
    if (!socket) return

    const onlobbyInvite = (data: any) => {
      notify(
        {
          buttonEvent: () => {
            socket.emit("lobbyAccept", {
              token: CookiesService.getJwtCookie(),
              data: data,
            })
          },
          buttonTitle: "Accept",
          title: "lobby invite",
          message: `${data.username} invited you to lobby`,
          imgSrc: data.avatarUrl,
        },
        true
      )
    }

    const onLeaveLobby = (data: ProfileData) => {
      setStartingTimer(5)
      setLobby(null)
      socket.emit("presence", {
        data: "Online",
      })
      if (!data) return
      notify({
        title: "Lobby notice",
        message: `${data.username} has left the lobby`,
        imgSrc: data.avatarUrl,
      })
    }
    const onLobbyCreated = (data: Lobby) => {
      router.push("/game/lobby")
      socket.emit("presence", {
        data: "In-Lobby",
      })
      setInQueue(false)
      setLobby(data)
    }
    const onLobbyChange = (lobby: Lobby) => {
      lobby.lobbySate == "ingame" &&
        socket.emit("presence", {
          data: "In-Game",
        })
      setInQueue(false)
      setLobby(lobby)
    }

    const onMatchFound = () => {
      notify({
        title: "match notice",
        message: `Match Found`,
        imgSrc: "/assets/matchFound.png",
      })
    }

    const onMatchStarting = (counter: number) => {
      setStartingTimer(counter)
    }

    const onEnterQueue = (data: QueueData) => {
      setTimer((Date.now() - data.startDate) / 1000)

      setInQueue(true)
    }

    const onLeaveQueue = () => {
      setInQueue(false)
    }

    const onAlreadyInLobby = () => {
      notify({
        message: "You already joined the lobby",
        title: "Lobby notice",
      })
    }

    const handleGameEnd = ({
      lobby,
      rewards,
    }: {
      lobby: any
      rewards: any
    }) => {
      window.sessionStorage.setItem(
        "endGameData",
        JSON.stringify({ lobby, ...rewards })
      )
      router.push("/game/endGame")
    }

    const onCantLeave = () => {
      notify({
        message: "You can't leave an on going game",
        title: "Lobby notice",
      })
    }
    socket.on("lobbyData", onLobbyCreated)
    socket.on("lobbyInvite", onlobbyInvite)
    socket.on("leaveLobby", onLeaveLobby)
    socket.on("lobbyChange", onLobbyChange)
    socket.on("matchFound", onMatchFound)
    socket.on("matchStarting", onMatchStarting)
    socket.on("enterQueue", onEnterQueue)
    socket.on("leaveQueue", onLeaveQueue)
    socket.on("alreadyInLobby", onAlreadyInLobby)
    socket.on("cantLeave", onCantLeave)
    socket?.on("gameEnd", handleGameEnd)

    return () => {
      socket.off("lobbyData", onLobbyCreated)
      socket.off("lobbyInvite", onlobbyInvite)
      socket.off("leaveLobby", onLeaveLobby)
      socket.off("lobbyChange", onLobbyChange)
      socket.off("matchFound", onMatchFound)
      socket.off("matchStarting", onMatchStarting)
      socket.off("enterQueue", onEnterQueue)
      socket.off("leaveQueue", onLeaveQueue)
      socket.off("alreadyInLobby", onAlreadyInLobby)
      socket.off("cantLeave", onCantLeave)
      socket?.off("gameEnd", handleGameEnd)
    }
  }, [])
  return (
    <LobbyContext.Provider
      value={{
        lobby,
        timerState: [timer, setTimer],
        startingTimerState: [startingTimer, setStartingTimer],
        queueState: [inQueue, setInQueue],
      }}
    >
      {children}
    </LobbyContext.Provider>
  )
}
