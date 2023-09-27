import React from 'react'
import ChatBar from './components/ChatBar/ChatBar'
import Chat from './components/Chat'
import FriendInfo from './components/FriendInfo/FriendInfo'
import ChannelInfo from './components/Chat/ChannelInfo/ChannelInfo'
export default function Page() {
	return (
		<div className='w-full h-full flex gap-2'>
			<div className='h-full w-96'>
				<ChatBar />
			</div>
			<div className='flex-1 flex flex-col  h-full'>
				<Chat />

			</div>
			<div className=' h-full w-96'>
				<ChannelInfo />
			</div>

		</div>
	)
}
