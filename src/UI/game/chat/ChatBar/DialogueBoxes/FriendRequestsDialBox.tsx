import SectionTitle from "@/UI/game/profile/SectionTitle"
import FriendRequest from "./FriendRequest"
import { useContext, useEffect, useState } from "react"
import Loader from "@/components/BaseComponents/Loader";
import FriendRequestService from "@/services/FriendRequest.service";
import FriendRequests from "@/models/FriendRequest.model";
import { WebSocketContext } from "@/UI/WebSocketContextWrapper";
import { getJwtCookie } from "@/services/CookiesService";
export default function FriendRequestsDialBox() {
	const socket = useContext(WebSocketContext);
	const [requests, setRequests] = useState<FriendRequests[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [refresh, setRefresh] = useState(false)

	useEffect(() => {
		FriendRequestService.getRequests().then(data => {
			setIsLoading(false);
			setRequests(data.data);
		}).catch(err => {
			setIsLoading(false);
		})

	}, [refresh])

	useEffect(() => {
		const onFriendReqAction = () => {
			alert("yes")
			setRefresh(prevState => !prevState)
		}

		socket?.on("friendReqAction", onFriendReqAction)
		return () => {
			socket?.off("friendReqAction", onFriendReqAction)
		}
	}, [])



	const handleAccept = (data: FriendRequests) => {
		socket?.emit("friendAction", { token: getJwtCookie(), data });
		socket?.emit("friendReqAction", { token: getJwtCookie(), data });
		// FriendRequestService.acceptRequest(dto).then(() => {

		// }).catch((err) => {
		// 	alert("error")
		// })
	}


	const handleDecline = (data: FriendRequests) => {
		FriendRequestService.deleteRequest(data).then(() => {
			socket?.emit("friendReqAction", { token: getJwtCookie(), data: data });
		}).catch((err) => {
			alert("error")
		})
	}
	return (
		<div className="gradient-border-2 p-4 h-[50vh] min-w-[29rem]  overflow-y-scroll rounded-xl flex flex-col gap-1">
			<SectionTitle className="text-sm" text="Friend Requests" />
			{!isLoading && <div className="flex flex-col">
				{
					requests.map((data: FriendRequests) => <FriendRequest onDecline={() => handleDecline(data)} onAccept={() => handleAccept(data)} senderData={data.sender} />)
				}

			</div>
			}
			{isLoading && <div className=" flex flex-col flex-1 justify-center">
				<Loader className="mx-auto scale-50" />
			</div>}

			{
				(!isLoading && requests.length == 0) && <div className="flex flex-col flex-1 justify-center">
					<span className="mx-auto"> No Requests for now , stay safe paddler</span>
				</div>
			}


		</div>
	)
}
