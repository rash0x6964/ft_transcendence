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
  const lobby = useContext(LobbyContext)
  const { profileData: profile, setProfileData } = useContext(ProfileContext)

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
    if (!lobby) return
    let tmpLobby = lobby
    setRanked(data)

    tmpLobby.ranked = data == "Ranked"
    socket?.emit("lobbyChange", {
      token: CookiesService.getJwtCookie(),
      data: tmpLobby,
    })
  }

  let inQ: boolean = false
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
              className={`w-fit mx-auto  bg-secondary ${
                !lobby?.isOwner ? "opacity-60" : ""
              }`}
            />
            {lobby?.queueLobby && (
              <div className="mx-auto">
                {!inQ && (
                  <MainButton
                    glow={true}
                    className="px-20 py-6 items-center text-lg font-semibold mx-auto self-end"
                  >
                    Find Game
                  </MainButton>
                )}
                {inQ && <QueueTimer />}
              </div>
            )}

            {!lobby.queueLobby && (
              <div className="mx-auto">
                <MainButton
                  glow={true}
                  className="px-20 py-6 items-center text-lg font-semibold mx-auto self-end"
                >
                  Create Game
                </MainButton>
              </div>
            )}
          </div>
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

            <OpponentCard onClick={() => setDialogueClose(false)} />
          </div>
          <div className="flex flex-col flex-1 justify-around">
            <RadioGroup
              disabled={false}
              className="flex gap-4 mx-auto "
              onChange={handleRadioChange}
              radios={radios}
              defaultVal={ranked}
              glow={true}
            />

            <GameModBar className={`w-fit mx-auto  bg-secondary `} />

            <div className="mx-auto">
              {!inQ && (
                <MainButton
                  glow={true}
                  className="px-20 py-6 items-center text-lg font-semibold mx-auto self-end"
                >
                  Find Game
                </MainButton>
              )}
              {inQ && <QueueTimer />}
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
