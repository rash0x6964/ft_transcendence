import React from 'react'
import Message from './Message'
import LobbyInvite from './Messages/LobbyInvite'
type Props =
{
	className?:string
}
export default function MainChat({className}:Props) {
  return (
	<div className={` bg-secondary  rounded-xl drop-shadow-lg flex flex-col gap-3 p-5 overflow-y-auto ${className}`}>
		<Message mine={true} />
		<Message mine={false} />

	</div>
  )
}
