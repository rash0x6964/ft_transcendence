import React from 'react'
import MatchHistory from '../svgs/MatchHistory'

type Props =
	{
		history: boolean[]
		className?: string
	}
export default function NavHistory({ history, className }: Props) {
	return (
		<div className={className}>
			<div className="flex  gap-1 ">
				<MatchHistory className="my-auto" />
				{history.map((x, i) => (
					<div
						key={i}
						className={`w-[11px] h-[14px] my-auto rounded-sm ${x ? "bg-emerald-500" : "bg-red-500"
							}`}
					></div>
				))}
			</div>
		</div>
	)
}
