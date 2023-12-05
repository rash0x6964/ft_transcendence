import MainButton from "@/components/BaseComponents/MainButton"
import RadioGroup from "@/components/RadioGroup/RadioGroup"
import GameModBar from "./GameModBar"
import PlayerCard from "./PlayerCard"
import SwordsLogo from "./SwordsLogo"
import Lobby from "@/models/Lobby.model"
import { useContext } from "react"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import CookiesService from "@/services/CookiesService"
import { LobbyContext } from "@/UI/LobbyProvider"
import GameMod from "@/types/GameMod"
import Leave from "@/components/svgs/Leave"

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
  const {
    timerState,
    startingTimerState,
  }: { timerState: any; startingTimerState: any } = useContext(LobbyContext)
  const [timer, setTimer]: [number, any] = timerState
  const [startingTimer, setStartingTimer]: [number, any] = startingTimerState

  const handleCreateGame = () => {
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
      <div className="hidden sm:block h-[20%]"></div>
      <div className="flex mx-auto  flex-col sm:flex-row justify-center  gap-4  ">
        <PlayerCard
          playerImage={lobby.players[0].avatarUrl}
          playerName={lobby.players[0].userName}
          level={lobby.players[0].profile.level}
          RP={lobby.players[0].profile.rating}
        />

        <div className=" mx-auto flex flex-col justify-center sm:mx-6 md:mx-12 animate-pulse">
          <SwordsLogo className="my-auto sm:w-24 sm:h-24 h-16 w-16 relative" />
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
              {startingTimer}
            </div>
          </div>
        </div>
      )}

      {lobby.lobbySate == "idle" && (
        <div className="flex  flex-col flex-1 justify-around">
          <RadioGroup
            disabled={!lobby?.isOwner}
            className="hidden md:flex  gap-4 mx-auto "
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
            className={`w-fit mx-auto  hidden md:flex bg-secondary `}
          />

          {!lobby.isOwner && (
            <div className="mx-auto ">
              <button
                onClick={handleLeaveLobby}
                className="bg-mirage-400 px-8 py-6 w-fit h-fit flex hover:bg-mirage-400/50 border-r border-black rounded-md "
              >
                <Leave className="text-white mr-2" width={20} height={20} />
                <span className="text-white">Leave Lobby</span>
              </button>
            </div>
          )}
          {lobby?.isOwner && (
            <div className="mx-auto">
              <div className="flex">
                <button
                  onClick={handleLeaveLobby}
                  className="bg-mirage-400 hover:bg-mirage-400/50 border-r border-black rounded-l-md px-2"
                >
                  <Leave className="text-white" width={20} height={20} />
                </button>
                <MainButton
                  onClick={handleCreateGame}
                  glow={true}
                  className="px-16 py-6 items-center text-lg font-semibold mx-auto self-end rounded-l-none"
                >
                  Launch Game
                </MainButton>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
