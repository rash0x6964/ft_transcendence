import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { WebSocketContext } from "./WebSocketContextWrapper"
import User from "@/models/User.model"
import { NotifcationContext } from "./NotificationProvider"
import CookiesService from "@/services/CookiesService"
import Lobby from "@/models/Lobby.model"
import { useRouter } from "next/router"
import ProfileData from "@/models/ProfileData.model"
import interval from "@/services/QueueService"
import QueueData from "@/types/QueueData"

export const LobbyContext = createContext<any | null>(null)
export default function LobbyProvider({ children }: PropsWithChildren) {
  const notify = useContext(NotifcationContext)
  const router = useRouter()
  const [lobby, setLobby] = useState<Lobby | null>(null)
  const [timer, setTimer] = useState(0)
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
      setLobby(null)
      if (!data) return
      socket.emit("presence", {
        token: CookiesService.getJwtCookie(),
        data: "Online",
      })
      notify({
        title: "Lobby notice",
        message: `${data.username} has left the lobby`,
        imgSrc: data.avatarUrl,
      })
    }
    const onLobbyCreated = (data: Lobby) => {
      router.push("/game/lobby")
      socket.emit("presence", {
        token: CookiesService.getJwtCookie(),
        data: "In-Lobby",
      })
      setInQueue(false)
      setLobby(data)
    }
    const onLobbyChange = (lobby: Lobby) => {
      setInQueue(false)
      setLobby(lobby)
    }

    const onMatchFound = () => {
      notify({
        title: "match notice",
        message: `Match Found`,
        imgSrc: "https://cdn-icons-png.flaticon.com/512/3104/3104645.png",
      })
      setTimer(10)
    }

    const onMatchStarting = (counter: number) => {
      setTimer(counter)
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

    socket.on("lobbyData", onLobbyCreated)
    socket.on("lobbyInvite", onlobbyInvite)
    socket.on("leaveLobby", onLeaveLobby)
    socket.on("lobbyChange", onLobbyChange)
    socket.on("matchFound", onMatchFound)
    socket.on("matchStarting", onMatchStarting)
    socket.on("enterQueue", onEnterQueue)
    socket.on("leaveQueue", onLeaveQueue)
    socket.on("alreadyInLobby", onAlreadyInLobby)
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
    }
  }, [])
  return (
    <LobbyContext.Provider
      value={{
        lobby,
        timerState: [timer, setTimer],
        queueState: [inQueue, setInQueue],
      }}
    >
      {children}
    </LobbyContext.Provider>
  )
}
