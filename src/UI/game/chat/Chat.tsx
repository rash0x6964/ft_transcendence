import React, { useContext, useEffect, useState } from "react";
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

	let id: string = "clo79v0gp0001u5mg1ak3jwwi"

	useEffect(() => {
		MessageService.getDmMessages(id).then((data) => {
			setMessages(data.data);
		})


		socket?.on("privateMessage", (data) => {
			setMessages((prevState) => [...prevState, data.data])
		})
	}, [])


	const handleSend = (val: string) => {
		MessageService.sendDmMessage(val, id).then(data => {
			socket?.emit("privateMessage", { token: getJwtCookie(), data: data.data });
			setMessages((prevState) => [...prevState, data.data])
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
			<MainChat messages={messages} className="flex-1 w-full drop-shadow-lg" />
			<ChatInputs onSend={handleSend} />
		</div>
	);
}
