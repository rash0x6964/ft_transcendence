import MainButton from "@/components/BaseComponents/MainButton"
import Dialogue from "@/components/Dialogue/Dialogue"
import RadioGroup from "@/components/RadioGroup/RadioGroup"
import FriendsInviteDialBox from "../chat/ChatBar/DialogueBoxes/FriendsInviteDialBox"
import GameModBar from "./GameModBar"
import OpponentCard from "./OpponentCard"
import PlayerCard from "./PlayerCard"
import QueueTimer from "./QueueTimer"
import SwordsLogo from "./SwordsLogo"
import { useContext, useState } from "react"
import ProfileData from "@/models/ProfileData.model"
import { LobbyContext } from "@/UI/LobbyProvider"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import CookiesService from "@/services/CookiesService"
import GameMod from "@/types/GameMod"
import Head from "next/head"
import Leave from "@/components/svgs/Leave"
type Props = {
  className?: string
  handleRadioChange: (data: string) => void
  radios: string[]
  profile: ProfileData
  ranked: string
  handleGameModChange: (data: string) => void
  gameModes: GameMod[]
  gameModValue: string
}
export default function DefaultLobby({
  className,
  handleRadioChange,
  radios,
  profile,
  ranked,
  handleGameModChange,
  gameModes,
  gameModValue,
}: Props) {
  const [dialogueClose, setDialogueClose] = useState(true)
  const { queueState, timerState }: { queueState: any; timerState: any } =
    useContext(LobbyContext)
  const [timer, setTimer]: [number, any] = timerState
  const socket = useContext(WebSocketContext)
  const [inQueue, setInQueue]: [boolean, any] = queueState

  const handleFindMatch = () => {
    socket?.emit("presence", {
      token: CookiesService.getJwtCookie(),
      data: "In-Queue",
    })

    socket?.emit("enterQueue", {
      token: CookiesService.getJwtCookie(),
      data: {
        rating: profile.profile.rating,
        gameMode: gameModValue,
        ranked: ranked == "Ranked",
      },
    })
  }

  const handleCancelQueue = () => {
    socket?.emit("presence", {
      token: CookiesService.getJwtCookie(),
      data: "Online",
    })

    socket?.emit("leaveQueue", {
      token: CookiesService.getJwtCookie(),
    })
  }
  return (
    <>
      <Dialogue
        onBackDropClick={() => setDialogueClose(true)}
        closed={dialogueClose}
      >
        <FriendsInviteDialBox />
      </Dialogue>
      <div className="animate__animated animate__fadeIn container mx-auto flex flex-col   h-full  ">
        <div className="hidden sm:block h-[20%]"></div>
        <div className="flex mx-auto  flex-col sm:flex-row justify-center gap-4  ">
          <PlayerCard
            playerImage={profile.avatarUrl}
            playerName={profile.username}
            level={profile.profile.level}
            RP={profile.profile.rating}
          />

          <div className=" mx-auto flex flex-col justify-center sm:mx-6 md:mx-12 animate-pulse">
            <SwordsLogo className="my-auto sm:w-24 sm:h-24 h-16 w-16 relative" />
          </div>

          <OpponentCard inQ={inQueue} onClick={() => setDialogueClose(false)} />
        </div>
        <div className="flex  flex-col flex-1 justify-around">
          <RadioGroup
            disabled={inQueue}
            className="hidden md:flex  gap-4 mx-auto "
            onChange={handleRadioChange}
            radios={radios}
            value={ranked}
            glow={true}
          />

          <GameModBar
            gameMods={gameModes}
            value={gameModValue}
            onChange={handleGameModChange}
            disabled={inQueue}
            className={`w-fit mx-auto  hidden md:flex bg-secondary `}
          />

          <div className="mx-auto">
            {!inQueue && (
              <MainButton
                onClick={handleFindMatch}
                glow={true}
                className="px-20 py-6 items-center text-lg font-semibold mx-auto self-end "
              >
                Find Game
              </MainButton>
            )}
            {inQueue && <QueueTimer time={timer} onClick={handleCancelQueue} />}
          </div>
        </div>
      </div>
    </>
  )
}
