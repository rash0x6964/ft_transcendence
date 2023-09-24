import Avatar from '@/components/BaseComponents/Avatar'
import React from 'react'
import RP from '@/components/svgs/RP'

type Props =
	{
		className?: string,
		playerName: string,
		playerImage: string,
		RP: number,
		level: number,
		onClick?: () => void

	}

export default function PlayerCard({ className, playerName, RP: rankedPoints, level, playerImage, onClick }: Props) {
	return (

		<button onClick={onClick} className={`bg-gradient-to-b h-96 w-[15rem] from-backdrop to-mirage  transition-transform hover:opacity-70 hover:scale-105  pb-2  shadow border-slate-500 rounded-xl  gradient-border ${className}`}>
			<div className='flex flex-col justify-between h-full'>
				<div className='pt-16  '>
					<Avatar className='w-24 h-24 mb-4 border mx-auto ' src={playerImage} alt={playerImage} />
					<div className='text-base font-semibold text-center'> {playerName}</div>
					<div className='text-sm text-slate-600 text-center'> lvl {level}</div>
				</div>
				<div className='flex justify-center gap-2 '>
					<RP />
					<div className='my-auto text-sm font-semibold'>{rankedPoints}</div>
				</div>
			</div>

		</button>

	)
}
