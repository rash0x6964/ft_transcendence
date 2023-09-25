import React from 'react'
import ChatBar from './(components)/ChatBar'
import Chat from './(components)/Chat'
import FriendInfo from './(components)/FriendInfo'
export default function page() {
	return (
		<div className='w-full h-full flex gap-2'>
			<div className=' h-full'>
				<ChatBar />
			</div>
			<div className='flex-1  h-full'>
				<Chat />
			</div>
			<div className=' h-full'>
				<FriendInfo />
			</div>

		</div>
	)
}
