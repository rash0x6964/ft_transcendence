import React, { PropsWithChildren } from 'react'
import Swords from '@/components/svgs/Swords'
import MainButton from '@/components/BaseComponents/MainButton'

type Props =
	{
		className?: string
		onAccept?: () => void
	}

export default function LobbyInvite({ className, onAccept }: Props) {
	return (
		<div className={`bg-mirage text-xs border flex  flex-col rounded-md  border-gray-600 p-3  ${className}`}>
			<div className='text-gray-600'>Lobby Invite </div>
			<div className='flex justify-between'>
				<div className='flex items-center font-semibold text-xl gap-3'>
					<span>1</span>
					<div>
						<Swords className='text-primary' width={24} height={24} />
					</div>
					<span>1</span>
				</div>
				<MainButton onClick={onAccept} className='px-5 py-3' >Accept</MainButton>
			</div>


		</div>
	)
}
