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
	const notify = useContext(NotifcationContext);

	const [messages, setMessages] = useState<Message[]>([]);
	const [loaders, setLoaders] = useState(
		{
			loadingMsgs: false,
			uploading: false,
		}
	)

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
		if (e.target.files[0].size > 1000 * 1000 * 10) {
			notify({
				message: "file is larger then 10 MB",
				type: "notice",
				title: "file upload"
			})
			return;
		}
		formData.append("file", e.target.files[0], e.target.files[0].name);


		let upDir: "messages" | "channels" = isChannel() ? "channels" : "messages"
		setLoaders(prevState => { return { ...prevState, uploading: true } })
		UploadService.uploadFiles(upDir, formData).then(({ data }: { data: Attachment[] }) => {
			setLoaders(prevState => { return { ...prevState, uploading: false } })
			handleSend("", data[0]);

		}).catch(err => {
			setLoaders(prevState => { return { ...prevState, uploading: false } })


		})


	}

	useLayoutEffect(() => {
		if (!channelData)
			return;
		if (chatRef.current)
			chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "instant" })
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

		if (!channelData)
			return;
		setLoaders(prevState => { return { ...prevState, loadingMsgs: true } })
		if (!isChannel())
			MessageService.getDmMessages(channelData.id).then((data) => {
				setLoaders(prevState => { return { ...prevState, loadingMsgs: false } })
				setMessages(data.data);
			}).catch(err => {
				setLoaders(prevState => { return { ...prevState, loadingMsgs: false } })

			})
		else if (isChannel())
			MessageService.getChannelMessage(channelData.id).then((data) => {
				setLoaders(prevState => { return { ...prevState, loadingMsgs: false } })

				setMessages(data.data);
			}).catch(err => {
				setLoaders(prevState => { return { ...prevState, loadingMsgs: false } })

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
			<MainChat loading={loaders.loadingMsgs} chatRef={chatRef} messages={messages} className="flex-1 w-full drop-shadow-lg" />
			<ChatInputs uploading={loaders.uploading} onFile={handleFileChange} onSend={handleSend} />
		</div>
	);
}
