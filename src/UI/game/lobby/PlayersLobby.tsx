import HeadTitle from "@/components/BaseComponents/HeadTitle"
import MainButton from "@/components/BaseComponents/MainButton"
import Dialogue from "@/components/Dialogue/Dialogue"
import RadioGroup from "@/components/RadioGroup/RadioGroup"
import lobby from "@/pages/game/lobby"
import FriendsInviteDialBox from "../chat/ChatBar/DialogueBoxes/FriendsInviteDialBox"
import GameModBar from "./GameModBar"
import PlayerCard from "./PlayerCard"
import SwordsLogo from "./SwordsLogo"
import Lobby from "@/models/Lobby.model"
import { useContext, useState } from "react"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import CookiesService from "@/services/CookiesService"
import { LobbyContext } from "@/UI/LobbyProvider"
import GameMod from "@/types/GameMod"
import { Head } from "next/document"

type Props = {
  className?: string
  lobby: Lobby
  ranked: string
  radios: string[]
  handleRadioChange: (data: string) => void
  handleGameModChange: (data: string) => void
  gameModes: GameMod[]
  gameModValue: string
}
export default function PlayersLobby({
  handleGameModChange,
  gameModes,
  gameModValue,
  handleRadioChange,
  ranked,
  className,
  lobby,
  radios,
}: Props) {
  const socket = useContext(WebSocketContext)
  const { timerState }: { timerState: any } = useContext(LobbyContext)
  const [timer, setTimer]: [number, any] = timerState

  const handleCreateGame = () => {
    setTimer(10)
    socket?.emit("createPrivateGame", {
      token: CookiesService.getJwtCookie(),
    })
  }
  const handleLeaveLobby = () => {
    socket?.emit("leaveLobby", {
      token: CookiesService.getJwtCookie(),
      data: lobby,
    })
  }

  return (
    <div
      className={`animate__animated animate__fadeIn container mx-auto flex flex-col   h-full  ${className} `}
    >
      <Head>
        <title>Pong Fury | lobby</title>
      </Head>
      <div className="h-[20%]"></div>
      <div className="flex justify-center gap-4  ">
        <PlayerCard
          playerImage={lobby.players[0].avatarUrl}
          playerName={lobby.players[0].userName}
          level={lobby.players[0].profile.level}
          RP={lobby.players[0].profile.rating}
        />

        <div
          onClick={handleLeaveLobby}
          className="h-96 flex flex-col justify-center mx-12 animate-pulse"
        >
          <SwordsLogo className="my-auto" />
        </div>
        <PlayerCard
          playerImage={lobby.players[1].avatarUrl}
          playerName={lobby.players[1].userName}
          level={lobby.players[1].profile.level}
          RP={lobby.players[1].profile.rating}
        />
      </div>

      {lobby.lobbySate == "starting" && (
        <div className="flex flex-col flex-1  justify-center">
          <div className="flex flex-col">
            <div className="text-lg mb-4 mx-auto ">Match Starting in :</div>
            <div className="mx-auto text-slate-400 text-base animate-ping">
              {timer}
            </div>
          </div>
        </div>
      )}

      {lobby.lobbySate == "idle" && (
        <div className="flex flex-col flex-1 justify-around">
          <RadioGroup
            disabled={!lobby?.isOwner}
            className="flex gap-4 mx-auto "
            onChange={handleRadioChange}
            radios={radios}
            value={ranked}
            glow={true}
          />
          <GameModBar
            value={gameModValue}
            onChange={handleGameModChange}
            gameMods={gameModes}
            disabled={!lobby?.isOwner}
            className={`w-fit mx-auto  bg-secondary  `}
          />
          {lobby?.isOwner && (
            <div className="mx-auto">
              <MainButton
                onClick={handleCreateGame}
                glow={true}
                className="px-20 py-6 items-center text-lg font-semibold mx-auto self-end"
              >
                Create Game
              </MainButton>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
