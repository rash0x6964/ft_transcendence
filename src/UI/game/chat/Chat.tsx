import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "./Chat/Header";
import ChatInputs from "./Chat/ChatInputs";
import MainChat from "./Chat/MainChat";
import Message from "@/models/Message.model";
import MessageService from "@/services/Message.service";
import { WebSocketContext } from "@/UI/WebSocketContextWrapper";
import { getJwtCookie } from "@/services/CookiesService";
export default function Chat() {
	const socket = useContext(WebSocketContext);
	const [messages, setMessages] = useState<Message[]>([]);

	let channelData = {
		"id": "clo79v0gp0001u5mg1ak3jwwi",
		"friendID": "7b14f8de-4385-425b-9036-42d20bcf8ef2",
		"avatarUrl": "https://avatars.githubusercontent.com/u/60697106?v=4",
		"userName": "KINCH3RO",
		"isSender": true,
		"onlineStatus": false,
		"lastMsg": [
			{
				"senderID": "9ad7136a-586c-4130-998a-722e6b250d77",
				"content": "df",
				"attachment": null
			}
		]
	}

	const chatRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (chatRef.current)
			chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" })

	}, [messages])

	useEffect(() => {
		MessageService.getDmMessages(channelData.id).then((data) => {
			setMessages(data.data);
		})

		let handler = (data: Message) => {
			setMessages((prevState) => [...prevState, data])

		}
		socket?.on("privateMessage", handler)

		return () => {
			socket?.off("privateMessage", handler)
		}
	}, [])


	const handleSend = (val: string) => {
		MessageService.sendDmMessage(val, channelData.id).then(data => {
			socket?.emit("privateMessage", { token: getJwtCookie(), data: data.data });

		}).catch(err => {

		})
	}

	return (
		<div className="w-full flex flex-col gap-2 h-full">
			<Header
				playerName="KINCH3RO"
				self={true}
				msg="Yeaaaah wooooo"
				src="https://steamavatar.io/img/14777429717elSu.jpg"
			/>
			<MainChat chatRef={chatRef} messages={messages} className="flex-1 w-full drop-shadow-lg" />
			<ChatInputs onSend={handleSend} />
		</div>
	);
}
