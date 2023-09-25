import React from 'react'
import Avatar from '@/components/BaseComponents/Avatar'
import Normal from './Messages/Normal'
import LobbyInvite from './Messages/LobbyInvite'
import ChannelInvite from './Messages/ChannelInvite'
import Attachment from './Messages/Attachment'
import ImageAttachment from './Messages/ImageAttachment'
import VideoAttachment from './Messages/videoAttachment'

type Props =
	{
		mine: boolean
	}

export default function Message({ mine }: Props) {

	return (
		<div className={`flex gap-3 ${!mine && "flex-row-reverse"} `}>
			<div className='flex flex-col  '>
				<Avatar className='w-12 h-12 mb-2' src='https://steamavatar.io/img/1477742864kHhXM.jpg' />
				<span className='text-[10px] text-gray-600 '>10:45 AM</span>
			</div>
			<div className='flex flex-col gap-2 max-w-[40%] '>
				<div className={mine ? "self-start" : "self-end"}>KiNCH3RO</div>
				<Normal className={`  ${mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"}`}>wa rachid baraka 3lik mn lmssmen o ylh t9ssr lik chi gamewa rachid baraka 3lik mn lmssmen o ylh t9ssr lik chi gamewa rachid baraka 3lik mn lmssmen o ylh t9ssr lik chi gamewa rachid baraka 3lik mn lmssmen o ylh t9ssr lik chi gamewa rachid baraka 3lik mn lmssmen o ylh t9ssr lik chi gamewa rachid baraka 3lik mn lmssmen o ylh t9ssr lik chi gamewa rachid baraka 3lik mn lmssmen o ylh t9ssr lik chi gamewa rachid baraka 3lik mn lmssmen o ylh t9ssr lik chi game</Normal>
				<LobbyInvite className={`w-96  ${mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"}`} />
				<ChannelInvite memberCount={5} channelName='skulls' className={`w-full  ${mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"}`} />
				<Attachment className={`w-96  ${mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"}`} url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' fileName='hack.js' fileSize={1.53} />
				<ImageAttachment fileName='katana.jpg' src="katana.jpg" className={`  ${mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"}`}  />
				<ImageAttachment fileName='katana.jpg' src="katana.jpg" className={`  ${mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"}`}  />
				<VideoAttachment fileName='katana.jpg' src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" className={`  ${mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"}`}  />

			</div>
		</div>
	)
}
