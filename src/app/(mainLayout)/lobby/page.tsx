'use client'
import React, { useState } from 'react'
import Avatar from '@/components/BaseComponents/Avatar'
import PlayerCard from './(components)/PlayerCard'
import OpponentCard from './(components)/OpponentCard'
import SwordsLogo from './(components)/SwordsLogo'
import GameModButton from './(components)/GameModButton'
import GameModBar from './(components)/GameModBar'
import MainButton from '@/components/BaseComponents/MainButton'
import RadioGroup from '@/components/RadioGroup/RadioGroup'
import QueueTimer from './(components)/QueueTimer'
export default function page() {

	let radios: string[] = ["Ranked", "Unranked"];
	const [opponent, setOpponent] = useState<Object | null>({});
	let inQ: boolean = false;

	return (
		<div className=' container mx-auto flex flex-col   h-full  '>
			<div className='h-[20%]'></div>
			<div className='flex justify-center gap-4  '>
				<PlayerCard playerImage='https://steamavatar.io/img/14777429717elSu.jpg' playerName='KiNCH3RO' level={10} RP={10050} />
				<div className='h-96 flex flex-col justify-center mx-12 animate-pulse'>
					<SwordsLogo className='my-auto' />
				</div>
				{opponent && <PlayerCard playerImage='https://steamavatar.io/img/1477787550ohrLq.jpg' playerName='rash0x6964' level={10} RP={10050} />}
				{!opponent && <OpponentCard />}
			</div>
			<div className='flex flex-col flex-1 justify-around'>
				<RadioGroup className='flex gap-4 mx-auto ' radios={radios} defaultVal='Unranked' glow={true} />
				<GameModBar className='w-fit mx-auto  bg-secondary' />
				<div className='mx-auto'>
					{!inQ && <MainButton glow={true} className='px-20 py-6 items-center text-lg font-semibold mx-auto self-end' >Find Game</MainButton>}
					{inQ && <QueueTimer />}
				</div>

			</div>
		</div>


	)
}
