import Input from "@/components/BaseComponents/Input"
import Search from "@/components/svgs/Search"
import ChannelMember from "./ChannelMember"
import { useEffect, useState } from "react"
import User from "@/models/User.model";
import Loader from "@/components/BaseComponents/Loader";
import UserService from "@/services/User.Service";
import { time } from "console";
import FriendRequestService from "@/services/FriendRequest.service";
export default function SearchPersonDialBox() {
	const [val, setVal] = useState("");
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		if (val == "")
			return;
		setIsLoading(true);
		const timeout = setTimeout(() => {
			UserService.findByName(val).then((data) => {
				setUsers(data.data);
				setIsLoading(false);
			}).catch(err => {

			})
		}, 1000)

		return () => {
			clearTimeout(timeout)
		}

	}, [val])


	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVal(e.target.value)
	}

	const handleSendRequest = (receiverID: string) => {
		FriendRequestService.sendRequest(receiverID).then((data) => {
			alert("success");
		}).catch(err => {
			alert("err");
		})
	}

	return (
		<div className="gradient-border-2 min-w-[29rem]  w-fit gradient-border-2 p-4 rounded-xl flex flex-col gap-1 ">
			<Input autoFocus={true} value={val} onChange={handleChange}
				className="mb-4 w-full h-11 bg-big-stone mx-auto"
				placeholder="Search"
				icon={<Search />}
			/>

			{isLoading && <Loader className="mx-auto scale-50" />}

			{(!isLoading && users.length > 0) && users.map((data: User) => <ChannelMember onSendRequest={()=> handleSendRequest(data.id)}
			className="animate__animated animate__fadeIn" src={data.avatarUrl} userName={data.userName} />)}



		</div>
	)
}

