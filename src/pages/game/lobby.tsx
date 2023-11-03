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
const Page: NextPageWithLayout = () => {
  const socket = useContext(WebSocketContext)
  const { profileData: profile, setProfileData } = useContext(ProfileContext)
  const { lobby, queueState, timerState } = useContext(LobbyContext)
  const [inQueue, setInQueue] = queueState
  const [timer, setTimer] = timerState

  let radios: string[] = ["Ranked", "Unranked"]
  const [dialogueClose, setDialogueClose] = useState(true)
  const [ranked, setRanked] = useState("Unranked")
  const handleLeaveLobby = () => {
    socket?.emit("leaveLobby", {
      token: CookiesService.getJwtCookie(),
      data: lobby,
    })
  }

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

  const handleFindMatch = () => {
    socket?.emit("presence", {
      token: CookiesService.getJwtCookie(),
      data: "In-Queue",
    })

    socket?.emit("enterQueue", {
      token: CookiesService.getJwtCookie(),
      data: {
        rating: profile.profile.rating,
        gameMode: "normal",
        ranked: ranked == "Ranked",
      },
    })
    setInQueue(true)
  }

  const handleCancelQueue = () => {
    socket?.emit("presence", {
      token: CookiesService.getJwtCookie(),
      data: "Online",
    })

    socket?.emit("leaveQueue", {
      token: CookiesService.getJwtCookie(),
    })

    setInQueue(false)
  }

  if (lobby)
    return (
      <>
        <HeadTitle>Pong Fury | lobby</HeadTitle>
        <Dialogue
          onBackDropClick={() => setDialogueClose(true)}
          closed={dialogueClose}
        >
          <FriendsInviteDialBox />
        </Dialogue>
        <div className="animate__animated animate__fadeIn container mx-auto flex flex-col   h-full  ">
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

          {!lobby.queueLobby && (
            <div className="flex flex-col flex-1 justify-around">
              <RadioGroup
                disabled={!lobby?.isOwner}
                className="flex gap-4 mx-auto "
                onChange={handleRadioChange}
                radios={radios}
                defaultVal={ranked}
                glow={true}
              />
              <GameModBar
                disabled={!lobby?.isOwner}
                className={`w-fit mx-auto  bg-secondary  `}
              />
              <div className="mx-auto">
                <MainButton
                  glow={true}
                  className="px-20 py-6 items-center text-lg font-semibold mx-auto self-end"
                >
                  Create Game
                </MainButton>
              </div>
            </div>
          )}
        </div>
      </>
    )
  else if (profile)
    return (
      <>
        <HeadTitle>Pong Fury | lobby</HeadTitle>
        <Dialogue
          onBackDropClick={() => setDialogueClose(true)}
          closed={dialogueClose}
        >
          <FriendsInviteDialBox />
        </Dialogue>
        <div className="animate__animated animate__fadeIn container mx-auto flex flex-col   h-full  ">
          <div className="h-[20%]"></div>
          <div className="flex justify-center gap-4  ">
            {!lobby && (
              <PlayerCard
                playerImage={profile.avatarUrl}
                playerName={profile.userName}
                level={profile.profile.level}
                RP={profile.profile.rating}
              />
            )}

            <div
              onClick={handleLeaveLobby}
              className="h-96 flex flex-col justify-center mx-12 animate-pulse"
            >
              <SwordsLogo className="my-auto" />
            </div>

            <OpponentCard
              inQ={inQueue}
              onClick={() => setDialogueClose(false)}
            />
          </div>
          <div className="flex flex-col flex-1 justify-around">
            <RadioGroup
              disabled={inQueue}
              className="flex gap-4 mx-auto "
              onChange={handleRadioChange}
              radios={radios}
              defaultVal={ranked}
              glow={true}
            />

            <GameModBar
              disabled={inQueue}
              className={`w-fit mx-auto  bg-secondary `}
            />

            <div className="mx-auto">
              {!inQueue && (
                <MainButton
                  onClick={handleFindMatch}
                  glow={true}
                  className="px-20 py-6 items-center text-lg font-semibold mx-auto self-end"
                >
                  Find Game
                </MainButton>
              )}
              {inQueue && (
                <QueueTimer time={timer} onClick={handleCancelQueue} />
              )}
            </div>
          </div>
        </div>
      </>
    )
  else return <></>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
