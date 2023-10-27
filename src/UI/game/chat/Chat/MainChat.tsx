import React, { useEffect } from 'react'
import Message from './Message'
import LobbyInvite from './Messages/LobbyInvite'
import MessageModel from '@/models/Message.model'
type Props =
	{
		messages: MessageModel[],
		className?: string,
		chatRef: React.LegacyRef<HTMLDivElement>
	}
export default function MainChat({ className, messages, chatRef }: Props) {
	useEffect(() => {


	})
	return (
		<div ref={chatRef} className={` bg-secondary   rounded-xl drop-shadow-lg flex flex-col gap-3 p-5 overflow-y-auto ${className}`}>

			{messages.map((message, index) => {
				let displayAvatar = index == 0 || message.senderID != messages[index - 1].senderID;
				return <Message avatar={displayAvatar} message={message} key={message.id} mine={message.mine} />
			})}


		</div>
	)
}
