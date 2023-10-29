import React, { useEffect, useRef } from 'react'
import Message from './Message'
import LobbyInvite from './Messages/LobbyInvite'
import MessageModel from '@/models/Message.model'
type Props =
	{
		onPaginate: () => void
		loading: boolean,
		paginating: boolean,
		messages: MessageModel[],
		className?: string,
		chatRef: React.RefObject<HTMLDivElement>
	}
export default function MainChat({ className, messages, chatRef, loading, onPaginate, paginating }: Props) {


	const timeDiff = (date1: Date, date2: Date) => {

		return Math.abs((date1.getTime() - date2.getTime()) / (1000 * 60)) > 20;
	}

	useEffect(() => {
		if (!chatRef.current)
			return;
		let prevValue: number | null = null;

		let scrollHandler = (e: any) => {
			if (prevValue && prevValue > e.currentTarget.scrollTop && e.currentTarget.scrollTop < 100) {
				onPaginate && onPaginate();
			}
			prevValue = e.currentTarget.scrollTop;


		}
		chatRef.current.addEventListener("scrollend", scrollHandler);

		return () => {
			chatRef.current?.removeEventListener("scrollend", scrollHandler);
		}

	}, [messages])
	if (loading)
		return (<div className={` bg-secondary  justify-center  rounded-xl drop-shadow-lg flex flex-col gap-3 p-5 overflow-y-auto ${className}`}>

			<span className='loader mx-auto'></span>

		</div>)
	else
		return (

			<div ref={chatRef} className={` bg-secondary   rounded-xl drop-shadow-lg flex flex-col gap-3 p-5 overflow-y-auto ${className}`}>
				{paginating && <div className='w-full my-8 flex justify-center' >
					<span className='loader scale-75 mx-auto'></span>
				</div>}
				{messages.map((message, index) => {
					let displayAvatar = index == 0 || message.senderID != messages[index - 1].senderID || timeDiff(new Date(message.createdAt), new Date(messages[index - 1].createdAt));
					return <Message avatar={displayAvatar} message={message} key={message.id} mine={message.mine} />
				})}


			</div>
		)
}
