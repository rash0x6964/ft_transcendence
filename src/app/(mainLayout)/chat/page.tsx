import React from 'react'
import ChatBar from './(components)/ChatBar'
import Chat from './(components)/Chat'
import FriendInfo from './(components)/FriendInfo'
import ChatInputs from './(components)/Chat/ChatInputs'
export default function page() {
	return (
		<div className='w-full h-full flex gap-2'>
			<div className='bg-slate-600 h-full w-96'>
				<ChatBar />
			</div>
			<div className='flex-1 flex flex-col  h-full'>
				<Chat />

			</div>
			<div className='bg-slate-600 h-full w-96'>
				<FriendInfo />
			</div>

		</div>
	)
}
