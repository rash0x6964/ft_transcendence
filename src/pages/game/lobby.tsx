import { useContext, useEffect, useState } from "react"
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

const Page: NextPageWithLayout = () => {
  const socket = useContext(WebSocketContext)
  const { profileData: profile, setProfileData } = useContext(ProfileContext)
  const { lobby }: { lobby: Lobby; queueState: any; timerState: any } =
    useContext(LobbyContext)
  const [ranked, setRanked] = useState("Unranked")
  const [gameMod, setGameMod] = useState("Normal")

  const radios: string[] = ["Ranked", "Unranked"]
  let gameMods = [
    {
      name: "Normal",
      src: "https://ninjoo.com/cdn/shop/products/Halfmoon3_800x800.png?v=1629977279",
    },
    {
      name: "Speed Demons",
      src: "https://thumbs.dreamstime.com/b/vector-abstract-futuristic-high-speed-illustration-digital-technology-colorful-background-concept-129976555.jpg",
    },
    {
      name: "Elastico",
      src: "https://ninjoo.com/cdn/shop/products/Halfmoon3_800x800.png?v=1629977279",
    },
  ]

  const handleRadioChange = (data: string) => {
    setRanked(data)
    if (!lobby) return

    lobby.ranked = data == "Ranked"
    socket?.emit("lobbyChange", {
      token: CookiesService.getJwtCookie(),
      data: lobby,
    })
  }

  const handleGameModChange = (name: string) => {
    setGameMod(name)

    if (!lobby) return
    lobby.mode = name
    socket?.emit("lobbyChange", {
      token: CookiesService.getJwtCookie(),
      data: lobby,
    })
  }

  useEffect(() => {
    if (!lobby) return
    setRanked(lobby.ranked ? "Ranked" : "Unranked")
    setGameMod(lobby.mode)
  }, [lobby])

  if (lobby && lobby.lobbySate == "ingame") return <GameLobby lobby={lobby} />

  if (lobby && lobby.lobbySate != "ingame")
    return (
      <PlayersLobby
        gameModValue={gameMod}
        gameModes={gameMods}
        ranked={ranked}
        lobby={lobby}
        handleGameModChange={handleGameModChange}
        handleRadioChange={handleRadioChange}
        radios={radios}
      />
    )
  else if (profile)
    return (
      <DefaultLobby
        gameModValue={gameMod}
        gameModes={gameMods}
        handleGameModChange={handleGameModChange}
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
