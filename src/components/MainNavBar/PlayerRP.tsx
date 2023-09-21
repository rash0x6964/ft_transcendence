import React from 'react'

import Badge from '../svgs/Badge'
type Props = {
	RP:number,
	className?:string
}
export default function PlayerRP({RP,className}:Props) {
	return (
		<div className={className}>
			<div className=" flex gap-2">
				<Badge className="my-auto" />
				<div className="text-xs font-semibold my-auto">{`${RP} `}RP</div>
			</div>
		</div>
	)
}
