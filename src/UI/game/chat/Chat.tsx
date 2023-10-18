import React from 'react'
import Header from './Chat/Header'
import ChatInputs from './Chat/ChatInputs'
import MainChat from './Chat/MainChat'
export default function Chat() {
  return (
	<div className='w-full flex flex-col gap-4 h-full'>
		<Header playerName='KINCH3RO' self={true} msg='Yeaaaah wooooo' src='https://steamavatar.io/img/14777429717elSu.jpg' />
		<MainChat className='flex-1 w-full drop-shadow-lg' />
		<ChatInputs />
	</div>
  )
}
