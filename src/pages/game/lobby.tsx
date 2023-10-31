import GameModBar from "@/UI/game/lobby/GameModBar";
import OpponentCard from "@/UI/game/lobby/OpponentCard";
import PlayerCard from "@/UI/game/lobby/PlayerCard";
import QueueTimer from "@/UI/game/lobby/QueueTimer";
import SwordsLogo from "@/UI/game/lobby/SwordsLogo";
import MainButton from "@/components/BaseComponents/MainButton";
import RadioGroup from "@/components/RadioGroup/RadioGroup";
import { useContext, useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import Layout from "@/UI/Layout";
import HeadTitle from "@/components/BaseComponents/HeadTitle";
import Dialogue from "@/components/Dialogue/Dialogue";
import FriendsInviteDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/FriendsInviteDialBox";
import { LobbyContext } from "@/UI/LobbyProvider";
import UserData from "@/models/UserData.model";
import { HttpClient } from "@/services/HttpClient";
import { WebSocketContext } from "@/UI/WebSocketContextWrapper";
import { getJwtCookie } from "@/services/CookiesService";

const Page: NextPageWithLayout = () => {
	const socket = useContext(WebSocketContext);
	const lobby = useContext(LobbyContext);
	let radios: string[] = ["Ranked", "Unranked"];
	const [dialogueClose, setDialogueClose] = useState(true)
	const [profile, setProfile] = useState<UserData | null>(null)

	const handleLeaveLobby = () => {
		socket?.emit("leaveLobby", { token: getJwtCookie(), data: lobby });
	}

	const handleRadioChange = (data: string) => {
		if (!lobby)
			return;
		let tmpLobby = lobby;

		tmpLobby.ranked = (data == "Ranked")

		console.log(tmpLobby?.ranked);

		socket?.emit("lobbyChange", { token: getJwtCookie(), data: tmpLobby });
	}
	useEffect(() => {
		HttpClient.get("/profile/data").then((data) => {
			setProfile(data.data)
		}).catch(err => {
		})
	}, [])
	let inQ: boolean = false;

	return (
		<>
			<HeadTitle>Pong Fury | lobby</HeadTitle>
			<Dialogue onBackDropClick={() => setDialogueClose(true)} closed={dialogueClose}>
				<FriendsInviteDialBox />
			</Dialogue>
			<div className='animate__animated animate__fadeIn container mx-auto flex flex-col   h-full  '>

				<div className='h-[20%]'></div>
				<div className='flex justify-center gap-4  '>
					{(!lobby && !profile) && <PlayerCard playerImage='https://steamavatar.io/img/14777429717elSu.jpg' playerName='KiNCH3RO' level={10} RP={10050} />}
					{(!lobby && profile) && <PlayerCard playerImage={profile.avatarUrl} playerName={profile.userName} level={profile.profile.level} RP={profile.profile.rating} />}
					{lobby && <PlayerCard playerImage={lobby.players[0].avatarUrl} playerName={lobby.players[0].userName} level={lobby.players[0].profile.level} RP={lobby.players[0].profile.rating} />}

					<div onClick={handleLeaveLobby} className='h-96 flex flex-col justify-center mx-12 animate-pulse'>
						<SwordsLogo className='my-auto' />
					</div>
					{lobby && <PlayerCard playerImage={lobby.players[1].avatarUrl} playerName={lobby.players[1].userName} level={lobby.players[1].profile.level} RP={lobby.players[1].profile.rating} />}
					{!lobby && <OpponentCard onClick={() => setDialogueClose(false)} />}
				</div>
				<div className='flex flex-col flex-1 justify-around' >
					{lobby && <RadioGroup disabled={lobby ? !lobby?.isOwner : false} className='flex gap-4 mx-auto ' onChange={handleRadioChange} radios={radios} defaultVal={lobby?.ranked ? "Ranked" : "Unranked"} glow={true} />}
					<GameModBar className={`w-fit mx-auto  bg-secondary ${!lobby?.isOwner ? "opacity-60" : ""}`} />
					{(!lobby || lobby?.queueLobby) && <div className='mx-auto'>
						{!inQ && <MainButton glow={true} className='px-20 py-6 items-center text-lg font-semibold mx-auto self-end' >Find Game</MainButton>}
						{inQ && <QueueTimer />}
					</div>
					}

					{(lobby && !lobby.queueLobby) && <div className='mx-auto'>
						<MainButton glow={true} className='px-20 py-6 items-center text-lg font-semibold mx-auto self-end' >Create Game</MainButton>
					</div>
					}

				</div>
			</div>
		</>



	)
}


Page.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			{page}
		</Layout>
	)
}

export default Page
