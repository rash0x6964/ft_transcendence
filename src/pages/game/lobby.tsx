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
import Calculating from "@/UI/game/lobby/Calculating"
import Head from "next/head"
import GameMod from "@/types/GameMod"

const Page: NextPageWithLayout = () => {
  const socket = useContext(WebSocketContext)
  const { profileData: profile, setProfileData } = useContext(ProfileContext)
  const { lobby }: { lobby: Lobby; queueState: any; timerState: any } =
    useContext(LobbyContext)
  const [ranked, setRanked] = useState("Unranked")
  const [gameMod, setGameMod] = useState("Normal")

  const radios: string[] = ["Ranked", "Unranked"]
  let gameMods: GameMod[] = [
    {
      name: "Normal",
      src: "/assets/normal.png",
    },
    {
      name: "Speed Demons",
      src: "/assets/speedD.png",
    },
    {
      name: "Magician",
      src: "/assets/magician.png",
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

  return (
    <>
      <Head>
        <title>Pong Fury | Lobby </title>
      </Head>
      {lobby && lobby.lobbySate == "ingame" && <GameLobby lobby={lobby} />}
      {lobby && lobby.lobbySate == "finishing" && <Calculating />}
      {lobby && lobby.lobbySate != "ingame" && (
        <PlayersLobby
          gameModValue={gameMod}
          gameModes={gameMods}
          ranked={ranked}
          lobby={lobby}
          handleGameModChange={handleGameModChange}
          handleRadioChange={handleRadioChange}
          radios={radios}
        />
      )}
      {!lobby && profile && (
        <DefaultLobby
          gameModValue={gameMod}
          gameModes={gameMods}
          handleGameModChange={handleGameModChange}
          handleRadioChange={handleRadioChange}
          profile={profile}
          radios={radios}
          ranked={ranked}
        />
      )}
    </>
  )
}
Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
