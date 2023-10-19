import React, { PropsWithChildren } from 'react'
import Swords from '@/components/svgs/Swords'
import MainButton from '@/components/BaseComponents/MainButton'
import Avatar from '@/components/BaseComponents/Avatar'

type Props =
	{
		className?: string
		channelName:string
		memberCount:number
		onAccept?: () => void
	}

export default function ChannelInvite({ className, onAccept ,channelName,memberCount}: Props) {
	return (
		<div className={`bg-mirage text-xs border flex gap-2  flex-col rounded-md  border-gray-600 p-3  ${className}`}>
			<div className='text-gray-600'>Channel Invite </div>
			<div className='flex justify-between'>
				<div className='flex  font-semibold text-xl gap-3'>
					<Avatar className='w-12 h-12'  src='https://steamavatar.io/img/1477742893cXJWT.jpg'/>
					<div  className='flex flex-col justify-between py-1 text-xs'>
						<div>{channelName}</div>
						<div className='text-gray-600 '>{memberCount} members</div>
					</div>
				</div>
				<MainButton onClick={onAccept} className='px-5 py-3' >Accept</MainButton>
			</div>


		</div>
	)
}
