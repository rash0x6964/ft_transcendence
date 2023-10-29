import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { NotifcationContext } from "@/UI/NotificationProvider";


type Props =
	{
		channelData: DirectMessage | Channel | undefined;
	}

export default function Chat({ channelData }: Props) {
	const socket = useContext(WebSocketContext);
	const chatRef = useRef<HTMLDivElement>(null);
	const isChannel = () => (channelData as Channel)?.visibility != undefined;
	const channelCheck = (messages: Message[]) => messages.length > 0 && (messages[0].channelID ?? messages[0].directmessageID) == channelData?.id;
	const channelCheckM = (message: Message) => (message.channelID ?? message.directmessageID) == channelData?.id;

	const [messages, setMessages] = useState<Message[]>([]);
	const [sent, setSent] = useState(false);
	const [loaders, setLoaders] = useState(
		{
			loadingMsgs: false,
			uploading: false,
			paginating: false
		}
	)


	const handleSend = (val: string, attachement: Attachment | undefined = undefined) => {
		if (!channelData)
			return;
		let emitEvent = isChannel() ? "channelMessage" : "privateMessage";
		MessageService.sendMessage(val, channelData.id, isChannel(), attachement).then(data => {
			socket?.emit(emitEvent, { token: getJwtCookie(), data: data.data });
		}).catch(err => {

		})


	}

	const handleFileChange = (formData: FormData) => {
		let upDir: "messages" | "channels" = isChannel() ? "channels" : "messages"
		setLoaders(prevState => { return { ...prevState, uploading: true } })
		UploadService.uploadFiles(upDir, formData).then(({ data }: { data: Attachment[] }) => {
			setLoaders(prevState => { return { ...prevState, uploading: false } })
			handleSend("", data[0]);

		}).catch(err => {
			setLoaders(prevState => { return { ...prevState, uploading: false } })
		})
	}

	const handlePaginate = () => {

		if (!channelData)
			return
		setLoaders(prevState => { return { ...prevState, paginating: true } })
		//delay because the animation is too flashy
		MessageService.getMessages(channelData.id, isChannel(), messages.length).then(({ data }: { data: Message[] }) => {
			setLoaders(prevState => { return { ...prevState, paginating: false } })
			if (!channelCheck(data))
				return
			setMessages(prevState => [...data.reverse(), ...prevState]);
		}).catch(err => {
			setLoaders(prevState => { return { ...prevState, paginating: false } })

		})
	}

	useEffect(() => {
		if (!channelData || loaders.paginating)
			return;
		if (chatRef.current)
			chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" })
	}, [sent])

	useEffect(() => {
		if (!channelData)
			return;
		let handler = (data: Message) => {


			if (!channelCheckM(data))
				return;
			setMessages((prevState) => [...prevState, data])
			setSent(prevState => !prevState)
		}
		socket?.on("privateMessage", handler)
		socket?.on("channelMessage", handler);

		return () => {
			socket?.off("privateMessage", handler)
			socket?.off("channelMessage", handler);

		}
	}, [channelData])

	useEffect(() => {

		if (!channelData)
			return;

		setLoaders(prevState => { return { ...prevState, loadingMsgs: true } })
		MessageService.getMessages(channelData.id, isChannel()).then(({ data }: { data: Message[] }) => {
			setLoaders(prevState => { return { ...prevState, loadingMsgs: false } })
			setMessages(data.reverse());
			setSent(prevState => !prevState)

		}).catch(err => {
			setLoaders(prevState => { return { ...prevState, loadingMsgs: false } })
			setMessages([]);

		})

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
			<MainChat onPaginate={handlePaginate} paginating={loaders.paginating} loading={loaders.loadingMsgs} chatRef={chatRef} messages={messages} className="flex-1 w-full drop-shadow-lg" />
			<ChatInputs uploading={loaders.uploading} onFile={handleFileChange} onSend={handleSend} />
		</div>
	);
}
