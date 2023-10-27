
import FriendService from "@/services/Friend.service";
import { getJwtCookie } from "@/services/CookiesService";
import FriendStatus from "@/models/FriendStatus.model";
import { Socket } from "socket.io-client";
import { useContext, useEffect, useState } from "react";
import { NotifcationContext } from "@/UI/NotificationProvider";

export const handleBlock = (selectedData: FriendStatus | null) => {
	if (!selectedData)
		return

	FriendService.blockUser(selectedData).then((data) => {
		alert("success")
	}).catch(err => {
		alert("error")
	})
}

export const handleUnblock = (selectedData: FriendStatus | null) => {
	if (!selectedData)
		return
	FriendService.unBlockUser(selectedData).then((data) => {
		alert("success")
	}).catch(err => {
		alert("error")
	})
}

export const handleMute = (selectedData: FriendStatus | null) => {
	if (!selectedData)
		return
	FriendService.blockUser(selectedData).then((data) => {
		alert("success")
	}).catch(err => {
		alert("error")
	})
}

export const handleUnMute = (selectedData: FriendStatus | null) => {
	if (!selectedData)
		return
	FriendService.unBlockUser(selectedData).then((data) => {
		alert("success")
	}).catch(err => {
		alert("error")
	})
}

export const handleFriendRemove = (selectedData: FriendStatus | null, socket: Socket | null) => {
	if (!selectedData)
		return
	FriendService.removeFriend(selectedData).then(() => {
		socket?.emit("friendAction", { token: getJwtCookie(), data: selectedData });
	}
	).catch(err => {

	})

}

export function isBlocked(data: FriendStatus | null): boolean {
	if (data == null)
		return false;
	if (data.isSender)
		return (data.blockStatus == "SENDER" || data.blockStatus == "BOTH")
	if (!data.isSender)
		return (data.blockStatus == "RECEIVER" || data.blockStatus == "BOTH")
	return false;
}

export function isMuted(data: FriendStatus | null): boolean {
	if (data == null)
		return false;
	if (data.isSender)
		return (data.muteStatus == "SENDER" || data.muteStatus == "BOTH")
	if (!data.isSender)
		return (data.muteStatus == "RECEIVER" || data.muteStatus == "BOTH")
	return false;
}



export function useRightBarSocket(socket: Socket | null): [friendList: FriendStatus[], setFriendList: React.Dispatch<React.SetStateAction<FriendStatus[]>>] {
	const [friendList, setFriendList] = useState<FriendStatus[]>([])
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		FriendService.getFriendList().then((data) => {
			setFriendList(data.data);
		}).catch(err => {

		})
	}, [refresh])



	useEffect(() => {
		const onConnect = (userId: string) => {
			setFriendList((prevStatus: FriendStatus[]) => {
				return prevStatus.map((data: FriendStatus) => {
					if (data.friend && data.friend.id == userId)
						data.friend.onlineStatus = true;
					return data;
				})
			})
		}

		const onDisconnect = (userId: string) => {
			setFriendList((prevStatus: FriendStatus[]) => {
				return prevStatus.map((data: FriendStatus) => {
					if (data.friend && data.friend.id == userId)
						data.friend.onlineStatus = false;
					return data;
				})
			})
		}

		const onFriendAction = () => {
			setRefresh(prevState => !prevState);
		}


		socket?.on("connected", onConnect);
		socket?.on("disconnected", onDisconnect);
		socket?.on("friendAction", onFriendAction);
		return () => {
			socket?.off("connected", onConnect)
			socket?.off("connected", onDisconnect)
			socket?.off("friendAction", onFriendAction);


		}
	}, [])


	return [friendList, setFriendList]
}
