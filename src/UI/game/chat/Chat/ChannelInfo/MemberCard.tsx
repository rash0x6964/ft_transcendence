import React, { MouseEventHandler } from 'react'
import Avatar from '@/components/BaseComponents/Avatar'
import { MouseEvent } from 'react'
import { ChannelUser } from '@/models/Channel.model'
type Props = {
	playerAvatar: string
	playerName: string
	playerState: string
	data: ChannelUser | undefined
	onContextMenu?: (e:MouseEvent<HTMLDivElement>, data: ChannelUser | undefined) => void // enum
}


export default function MemberCard({ playerAvatar, playerName, playerState, data, onContextMenu }: Props) {


	const handleMouseEvent = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		onContextMenu && onContextMenu(e, data);
	};
	return (
		<div onContextMenu={handleMouseEvent}>

			<div
				className="flex gap-3 px-3 max-w-[309px] min-w-fit">

				<Avatar
					className="w-10 h-10 cursor-pointer"
					src={playerAvatar}
					alt={playerName}
				/>
				<div className="flex flex-col gap-1">
					<span className="self-center text-sm">{playerName}</span>
					<span className="text-[10px] text-primary font-light">
						{playerState}
					</span>
				</div>
			</div>
		</div>
	)
}
