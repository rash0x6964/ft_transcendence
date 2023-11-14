import { useContext, useState } from "react"
import { NextPageWithLayout } from "../_app"
import { ReactElement } from "react"
import Layout from "@/UI/Layout"
import { LobbyContext } from "@/UI/LobbyProvider"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import CookiesService from "@/services/CookiesService"
import { ProfileContext } from "@/UI/ActiveUserProvider"
import Lobby from "@/models/Lobby.model"
import GameLobby from "@/UI/game/lobby/GameLobby"
import PlayersLobby from "@/UI/game/lobby/PlayersLobby"
import DefaultLobby from "@/UI/game/lobby/DefaultLobby"
import EndGame from "@/UI/game/lobby/EndGame"

const Page: NextPageWithLayout = () => {
  const socket = useContext(WebSocketContext)
  const { profileData: profile, setProfileData } = useContext(ProfileContext)
  const { lobby }: { lobby: Lobby; queueState: any; timerState: any } =
    useContext(LobbyContext)

  let radios: string[] = ["Ranked", "Unranked"]
  const [ranked, setRanked] = useState("Unranked")

  const handleRadioChange = (data: string) => {
    setRanked(data)
    if (!lobby) return
    let tmpLobby = lobby

    tmpLobby.ranked = data == "Ranked"
    socket?.emit("lobbyChange", {
      token: CookiesService.getJwtCookie(),
      data: tmpLobby,
    })
  }

  if (lobby && lobby.lobbySate == "ingame") return <GameLobby lobby={lobby} />
//   if (lobby && lobby.lobbySate == "finished") return <EndGame lobby={lobby} />

  if (lobby && lobby.lobbySate != "ingame")
    return (
      <PlayersLobby
        lobby={lobby}
        handleRadioChange={handleRadioChange}
        radios={radios}
      />
    )
  else if (profile)
    return (
      <DefaultLobby
        handleRadioChange={handleRadioChange}
        profile={profile}
        radios={radios}
        ranked={ranked}
      />
    )
  else return <></>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
