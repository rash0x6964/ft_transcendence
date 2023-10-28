import React from "react";
import Avatar from "@/components/BaseComponents/Avatar";
import Normal from "./Messages/Normal";
import LobbyInvite from "./Messages/LobbyInvite";
import ChannelInvite from "./Messages/ChannelInvite";
import Attachment from "./Messages/Attachment";
import ImageAttachment from "./Messages/ImageAttachment";
import VideoAttachment from "./Messages/VideoAttachment";
import Message from "@/models/Message.model";
import datePipe from "@/pipes/date.pipes";
import UrlPipe from "@/pipes/url.pipe";

type Props = {
	avatar: boolean,
	message?: Message;
	mine: boolean;
};

export default function Message({ avatar, mine, message }: Props) {
	if (message?.attachment)
		return (
			<div className={`flex  gap-3 ${!mine && "flex-row-reverse"} `}>
				{avatar && <div className="flex flex-col  ">
					<Avatar
						className="w-12 h-12 mb-2"
						src={message?.sender?.avatarUrl}
					/>
					<span className="text-[10px] text-gray-600 ">{datePipe(message.createdAt)} </span>
				</div>}
				{!avatar && <div className="w-12"></div>}
				<div className="flex flex-col gap-2 max-w-[40%] ">
					{avatar && <div className={mine ? "self-start" : "self-end"}>{message?.sender?.userName}</div>}

					{message.attachment.type == "FILE" && <Attachment
						className={`w-96  ${mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"
							}`}
						url={message.attachment.url}
						fileName={message.attachment.name}
						fileSize={message.attachment.size}
					/>}


					{message.attachment.type == "VIDEO" && <VideoAttachment
						fileName={message.attachment.name}
						src={message.attachment.url}
						className={`  ${mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"
							}`}
					/>}


					{message.attachment.type == "IMAGE" && <ImageAttachment
						fileName={message.attachment.name}
						src={message.attachment.url}
						className={`  ${mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"
							}`}
					/>}



				</div>
			</div>)

	return (
		<div className={`flex gap-3 ${!mine && "flex-row-reverse"} `}>
			{avatar && <div className="flex flex-col  ">
				<Avatar
					className="w-12 h-12 mb-2"
					src={message?.sender?.avatarUrl}
				/>
				<span className="text-[10px] text-gray-600 ">{message && datePipe(message?.createdAt)}</span>
			</div>}
			{!avatar && <div className="w-12"></div>}
			<div className="flex flex-col gap-2 max-w-[40%]  ">
				{avatar && <div className={mine ? "self-start" : "self-end"}>{message?.sender?.userName}</div>}
				<Normal
					className={`  max-w-full break-words  ${mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"
						}`}
				>
					<UrlPipe message={message?.content} />
				</Normal>
				{/* <LobbyInvite
					className={`w-96  ${mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"
						}`}
				/>
				<ChannelInvite
					memberCount={5}
					channelName="skulls"
					className={`w-full  ${mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"
						}`}
				/>
			 */}
			</div>
		</div>
	);
}
