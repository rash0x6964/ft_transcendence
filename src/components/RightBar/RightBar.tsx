import React, { useState } from "react"
import Person from "./Person"
import FriendIcon from "../svgs/Friend"
import Friend from "../svgs/Friend"
import DialButton from "@/UI/game/chat/ChatBar/DialogueBoxes/DialButton"
import AddUser from "../svgs/AddUser"
import Dialogue from "../Dialogue/Dialogue"
import FriendRequestsDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/FriendRequestsDialBox"
import FriendCheck from "../svgs/FriendCheck"
import SearchPersonDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/SearchPersonDialBox"

type Props = {
	className?: string
}

export default function RightBar({ className }: Props) {

	const [dialogueClosed, setDialogueClosed] = useState(true);
	const [dialogueClosedFriends, setDialogueClosedFriends] = useState(true);
	return (
		<>

			<Dialogue onBackDropClick={() => setDialogueClosed(true)} closed={dialogueClosed}>
				<FriendRequestsDialBox />
			</Dialogue>

			<Dialogue onBackDropClick={() => setDialogueClosedFriends(true)} closed={dialogueClosedFriends}>
				<SearchPersonDialBox  />
			</Dialogue>

			<div className={`bg-secondary rounded-lg  pb-2 pt-5  h-full  w-16 ${className}`}>

				<div className="flex flex-col justify-between h-full">
					<div className="flex flex-col gap-2 items-center ">
						<Friend />
						<div className="w-[29px] h-[1px] bg-slate-700"></div>
						<Person userName="rash" connected={true} />
						<Person userName="rash" connected={true} />
						<Person userName="rash" connected={true} />
						<Person userName="rash" connected={true} />
						<Person userName="rash" connected={true} />
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

