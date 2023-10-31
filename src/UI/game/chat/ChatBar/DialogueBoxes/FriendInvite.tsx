import Check from "@/components/svgs/Check"
import DialButton from "./DialButton"
import Cross2 from "@/components/svgs/Cross2"
import MainButton from "@/components/BaseComponents/MainButton"
import { useContext, useState } from "react"
import FriendStatus from "@/models/FriendStatus.model"
import Avatar from "@/components/BaseComponents/Avatar"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import { getJwtCookie } from "@/services/CookiesService"

type Props = {
	friendData?: FriendStatus,
}
export default function FriendInvite({ friendData }: Props) {
	const socket = useContext(WebSocketContext);
	const [inviteSent, setInviteSent] = useState(false);


	const handleInvite = () => {
		socket?.emit("lobbyInvite", { token: getJwtCookie(), data: friendData?.friend });
		setInviteSent(true);
	}
	return (
		<div className="flex justify-between w-[28rem] mr-4">
			<div className="flex ml-4">
				<Avatar className="m-2 w-10 h-10 " src={friendData?.friend?.avatarUrl} alt={friendData?.friend?.userName} />
				<p className="text-sm my-auto">{friendData?.friend?.userName}</p>
			</div>
			{!inviteSent && <MainButton onClick={handleInvite} className="h-fit px-4 py-3 text-xs font-semibold rounded-sm my-auto" >
				Invite
			</MainButton>}


			{inviteSent && <span className="text-sm  text-primary my-auto">Invite Sent</span>}


		</div>
	)
}
