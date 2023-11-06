import GameModBar from "@/UI/game/lobby/GameModBar"
import OpponentCard from "@/UI/game/lobby/OpponentCard"
import PlayerCard from "@/UI/game/lobby/PlayerCard"
import QueueTimer from "@/UI/game/lobby/QueueTimer"
import SwordsLogo from "@/UI/game/lobby/SwordsLogo"
import MainButton from "@/components/BaseComponents/MainButton"
import RadioGroup from "@/components/RadioGroup/RadioGroup"
import { useContext, useEffect, useState } from "react"
import { NextPageWithLayout } from "../_app"
import { ReactElement } from "react"
import Layout from "@/UI/Layout"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
import Dialogue from "@/components/Dialogue/Dialogue"
import FriendsInviteDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/FriendsInviteDialBox"
import { LobbyContext } from "@/UI/LobbyProvider"
import UserData from "@/models/UserData.model"
import { HttpClient } from "@/services/HttpClient"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import CookiesService from "@/services/CookiesService"
import { ProfileContext } from "@/UI/ActiveUserProvider"
import Lobby from "@/models/Lobby.model"
import Avatar from "@/components/BaseComponents/Avatar"
import Swords from "@/components/svgs/Swords"
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
