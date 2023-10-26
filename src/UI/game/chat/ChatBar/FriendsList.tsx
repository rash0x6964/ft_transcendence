import { useContext, useEffect, useState } from "react";
import FriendBar from "./FriendBar"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper";
import DirectMessage from "@/models/DM.model";
import DMService from "@/services/DMService";

type Prop = {
	selectedId: string
	handleClick: (id: string) => void
}
export default function FriendsList({ selectedId, handleClick }: Prop) {

  const socket = useContext(WebSocketContext);
  const [DMList, setDMList] = useState<DirectMessage[]>([]);

  useEffect(() => {
    DMService.getDMList().then((data) => {
      setDMList(data.data)
    }).catch(err => {

    })
  }, [])

	return (
		<div className="flex flex-col h-[40%] gap-2 overflow-y-scroll">
			{
					DMList.map((data: DirectMessage) => {
						return <FriendBar
							key={data.friendID}
							id={data.friendID}
							handleClick={handleClick}
							isSelected={data.friendID == selectedId}
							src={data.avatarUrl}
							alt="Avatar"
							username={data.userName}
							isOnline={data.onlineStatus}
							lastMessage={data.lastMsg[0].content}
							time="14:23 PM"
						/>
					})
			}
		</div>
	)
}
