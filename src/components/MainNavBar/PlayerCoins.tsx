import React from 'react'
import Coins from '../svgs/Coins'
import PropWithClass from '@/types/PropWithClass'
type Props =
{
	coins:number
}
export default function ({coins,className}:Props & PropWithClass) {
	return (
		<div className={className}>
			<div className="flex gap-2 ">
				<Coins className="my-auto" />
				<span className="text-xs font-semibold my-auto">{coins} coins</span>
			</div>
		</div>
	)
}
