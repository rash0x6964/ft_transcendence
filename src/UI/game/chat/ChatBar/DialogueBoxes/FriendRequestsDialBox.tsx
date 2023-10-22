import SectionTitle from "@/UI/game/profile/SectionTitle"
import FriendRequest from "./FriendRequest"
import { useEffect, useState } from "react"
import Loader from "@/components/BaseComponents/Loader";
import FriendRequestService from "@/services/FriendService";

export default function FriendRequestsDialBox() {
	const [requests, setRequests] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		FriendRequestService.get().then(data => {

			console.log(data);
			setIsLoading(false);
			setRequests(data.data);
		}).catch(err => {

		})

	}, [])

	const handleAccept = () => {

	}


	const handleDecline = () => {

	}
	return (
		<div className="gradient-border-2 p-4 h-[50vh] min-w-[28rem]  overflow-y-scroll rounded-xl flex flex-col gap-1">
			<SectionTitle className="text-sm" text="Friend Requests" />
			{!isLoading && <div className="flex flex-col">
				{
					requests.map((data: any) => <FriendRequest senderData={data.sender} />)
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
