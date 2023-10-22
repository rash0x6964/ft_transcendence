import React, { useEffect, useRef, useState } from "react"
import Person from "./Person"
import FriendIcon from "../svgs/Friend"
import Friend from "../svgs/Friend"
import DialButton from "@/UI/game/chat/ChatBar/DialogueBoxes/DialButton"
import AddUser from "../svgs/AddUser"
import Dialogue from "../Dialogue/Dialogue"
import FriendRequestsDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/FriendRequestsDialBox"
import FriendCheck from "../svgs/FriendCheck"
import SearchPersonDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/SearchPersonDialBox"
import FriendService from "@/services/Friend.service"
import FriendStatus from "@/models/FriendStatus.model"
import ContextMenu, { MenuBtn, getMenuPos, useContextMenu } from "../BaseComponents/ContextMenu"
import { MouseEvent } from "react"
type Props = {
	className?: string
}

function isBlocked(data: FriendStatus | null): boolean {
	if (data == null)
		return false;
	if (data.isSender)
		return (data.blockStatus == "SENDER" || data.blockStatus == "BOTH")
	if (!data.isSender)
		return (data.blockStatus == "RECEIVER" || data.blockStatus == "BOTH")
	return false;
}

function isMuted(data: FriendStatus | null): boolean {
	if (data == null)
		return false;
	if (data.isSender)
		return (data.muteStatus == "SENDER" || data.muteStatus == "BOTH")
	if (!data.isSender)
		return (data.muteStatus == "RECEIVER" || data.muteStatus == "BOTH")
	return false;
}

export default function RightBar({ className }: Props) {

	const [friendList, setFriendList] = useState<FriendStatus[]>([])
	const [dialogueClosed, setDialogueClosed] = useState(true);
	const [dialogueClosedFriends, setDialogueClosedFriends] = useState(true);
	const menuRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ x: -500, y: -500 })
	const [clicked, setClicked] = useContextMenu(menuRef);
	const [data, setSelectedData] = useState<FriendStatus | null>(null);


	useEffect(() => {
		FriendService.getFriendList().then((data) => {
			setFriendList(data.data);
		}).catch(err => {

		})
	}, [])

	const handleContextMenu = (e: MouseEvent<HTMLDivElement>, data: FriendStatus) => {
		setSelectedData(data);
		setClicked(true);
		setPosition(getMenuPos(e, menuRef));
	}
	const handleBlock = () => {
		if (data) {
			FriendService.blockUser(data).then((data) => {
				alert("success")
			}).catch(err => {
				alert("error")
			})
		}
	}

	const handleUnblock = () => {
		if (data) {
			FriendService.unBlockUser(data).then((data) => {
				alert("success")
			}).catch(err => {
				alert("error")
			})
		}
	}

	const handleMute = () => {
		if (data) {
			FriendService.blockUser(data).then((data) => {
				alert("success")
			}).catch(err => {
				alert("error")
			})
		}
	}

	const handleUnMute = () => {
		if (data) {
			FriendService.unBlockUser(data).then((data) => {
				alert("success")
			}).catch(err => {
				alert("error")
			})
		}
	}

	return (
		<>
			<ContextMenu MenuRef={menuRef} clicked={clicked} pos={position} >
				{isBlocked(data)}
				<MenuBtn onClick={() => alert("yes")} title="Send Message" />
				<MenuBtn onClick={() => alert("yes")} title="Profile" />
				{!isBlocked(data) && <MenuBtn onClick={handleBlock} title="Block" />}
				{isBlocked(data) && <MenuBtn onClick={handleUnblock} title="unBlock" />}
				{!isMuted(data) && <MenuBtn onClick={handleMute} title="Mute" />}
				{isMuted(data) && <MenuBtn onClick={handleUnMute} title="unMute" />}
			</ContextMenu>
			<Dialogue onBackDropClick={() => setDialogueClosed(true)} closed={dialogueClosed}>
				<FriendRequestsDialBox />
			</Dialogue>

			<Dialogue onBackDropClick={() => setDialogueClosedFriends(true)} closed={dialogueClosedFriends}>
				<SearchPersonDialBox />
			</Dialogue>

			<div className={`bg-secondary rounded-lg  pb-2 pt-5  h-full  w-16 ${className}`}>

				<div className="flex flex-col justify-between h-full">
					<div className="flex flex-col gap-5 items-center ">
						<Friend />
						<div className="w-[29px] h-[1px] bg-slate-700"></div>
						<div className="flex flex-col gap-2">

							{friendList.map(data => <Person onContextMenu={(e) => {
								handleContextMenu(e, data);
							}} src={data.friend?.avatarUrl} userName={data.friend?.userName} connected={true} />)}

						</div>

					</div>
					<div className="flex flex-col items-center gap-2 ">

						<DialButton onClick={() => setDialogueClosed(false)} className="w-fit mx-auto">
							<FriendCheck width={16} height={16} />
						</DialButton>
						<div className="w-[29px] h-[1px] bg-slate-700 "></div>
						<DialButton onClick={() => setDialogueClosedFriends(false)} className="w-fit mx-auto">
							<AddUser width={16} height={16} />
						</DialButton>
					</div>
				</div>

			</div>
		</>


	)
}

