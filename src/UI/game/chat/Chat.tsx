import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "./Chat/Header";
import ChatInputs from "./Chat/ChatInputs";
import MainChat from "./Chat/MainChat";
import Message from "@/models/Message.model";
import MessageService from "@/services/Message.service";
import { WebSocketContext } from "@/UI/WebSocketContextWrapper";
import { getJwtCookie } from "@/services/CookiesService";
import { Channel } from "@/models/Channel.model";
import UploadService from "@/services/Upload.service";
import Attachment from "@/models/Attachment.model";
import DirectMessage from "@/models/DM.model";


type Props =
	{
		channelData: DirectMessage | Channel | undefined;
	}
export default function Chat({ channelData }: Props) {
	const socket = useContext(WebSocketContext);
	const [messages, setMessages] = useState<Message[]>([]);

	const isChannel = () => (channelData as Channel)?.visibility != undefined;


	const chatRef = useRef<HTMLDivElement>(null);

	const handleSend = (val: string, attachement: Attachment | undefined = undefined) => {
		if (!isChannel() && channelData)
			MessageService.sendDmMessage(val, channelData.id, attachement).then(data => {
				socket?.emit("privateMessage", { token: getJwtCookie(), data: data.data });
			}).catch(err => {

			})
		if (isChannel() && channelData)
			MessageService.sendChannelMessage(val, channelData.id, attachement).then(data => {
				socket?.emit("channelMessage", { token: getJwtCookie(), data: data.data });
			}).catch(err => {

			})



	}
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let formData = new FormData();

		if (!e.target.files || e.target.files.length <= 0)
			return;
		formData.append("file", e.target.files[0], e.target.files[0].name);
		UploadService.uploadFiles("messages", formData).then(({ data }: { data: Attachment[] }) => {
			handleSend("", data[0]);

		}).catch(err => {
			alert("err")

		})


	}

	useEffect(() => {
		if (!channelData)
			return;
		if (chatRef.current)
			chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" })
	}, [messages])

	useEffect(() => {
		if (!channelData)
			return;
		let handler = (data: Message) => {

			if (!isChannel() && (channelData as DirectMessage).id != data.directmessageID)
				return;
			setMessages((prevState) => [...prevState, data])

		}
		socket?.on("privateMessage", handler)
		socket?.on("channelMessage", handler);

		return () => {
			socket?.off("privateMessage", handler)
			socket?.off("channelMessage", handler);

		}
	}, [channelData])

	useEffect(() => {
		console.log(channelData);

		if (!channelData)
			return;
		if (!isChannel())
			MessageService.getDmMessages(channelData.id).then((data) => {
				setMessages(data.data);
			})
		else if (isChannel())
			MessageService.getChannelMessage(channelData.id).then((data) => {
				setMessages(data.data);
			})
		else
			setMessages([]);
	}, [channelData])



	return (
		<div className="w-full flex flex-col gap-2 h-full">

			{isChannel() && <Header
				playerName={(channelData as Channel)?.name}
				self={messages.length > 0 ? messages[messages.length - 1].mine : false}
				msg={messages.length > 0 ? messages[messages.length - 1].content : ""}
				src={(channelData as Channel).imageUrl}
			/>}

			{!isChannel() && <Header
				playerName={(channelData as DirectMessage)?.friend?.userName}
				self={messages.length > 0 ? messages[messages.length - 1].mine : false}
				msg={messages.length > 0 ? messages[messages.length - 1].content : ""}
				src={(channelData as DirectMessage)?.friend?.avatarUrl}
			/>}
			<MainChat chatRef={chatRef} messages={messages} className="flex-1 w-full drop-shadow-lg" />
			<ChatInputs onFile={handleFileChange} onSend={handleSend} />
		</div>
	);
}
