import React from "react";
import Avatar from "@/components/BaseComponents/Avatar";
import Normal from "./Messages/Normal";
import LobbyInvite from "./Messages/LobbyInvite";
import ChannelInvite from "./Messages/ChannelInvite";
import Attachment from "./Messages/Attachment";
import ImageAttachment from "./Messages/ImageAttachment";
import VideoAttachment from "./Messages/VideoAttachment";
import Message from "@/models/Message.model";

type Props = {
	avatar: boolean,
	message?: Message;
	mine: boolean;
};

export default function Message({ avatar, mine, message }: Props) {
	if (message?.attachment)
		return (
			<div className={`flex gap-3 ${!mine && "flex-row-reverse"} `}>
				{avatar && <div className="flex flex-col  ">
					<Avatar
						className="w-12 h-12 mb-2"
						src={message?.sender?.avatarUrl}
					/>
					<span className="text-[10px] text-gray-600 ">10:45 AM</span>
				</div>}
				{!avatar && <div className="w-12"></div>}
				<div className="flex flex-col gap-2 max-w-[40%] ">
					{avatar && <div className={mine ? "self-start" : "self-end"}>{message?.sender?.userName}</div>}

					{message.attachment.type == "FILE" && <Attachment
						className={`w-96  ${mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"
							}`}
						url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
						fileName="hack.js"
						fileSize={1.53}
					/>}


					{message.attachment.type == "VIDEO" && <VideoAttachment
						fileName="katana.jpg"
						src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
						className={`  ${mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"
							}`}
					/>}


					{message.attachment.type == "IMAGE" && <ImageAttachment
						fileName="katana.jpg"
						src="/katana.jpg"
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
				<span className="text-[10px] text-gray-600 ">10:45 AM</span>
			</div>}
			{!avatar && <div className="w-12"></div>}
			<div className="flex flex-col gap-2 max-w-[40%] ">
				{avatar && <div className={mine ? "self-start" : "self-end"}>{message?.sender?.userName}</div>}
				<Normal
					className={`  ${mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"
						}`}
				>
					{message?.content}
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
