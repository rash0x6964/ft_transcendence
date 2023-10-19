import React from 'react'
import PropWithClass from '@/types/PropWithClass'
export default function TableHead({ className }: PropWithClass) {
	return (
		<div className={ className}>

			<span className="self-center pr-10">Rank</span>
			<div className="flex   justify-around flex-1">
				<div className="self-center pr-24">  Player       </div>
				<span className="self-center  pr-8">Rating</span>
				<span className="self-center">Winrate</span>
				<span className="self-center">Game</span>
			</div>

		</div>
	)
}
