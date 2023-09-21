import React from 'react'
import PropWithClass from '@/types/PropWithClass'

type Props = {
	name: string,
	src: string,
	className?:string
}
export default function PlayerName({ name, src , className }: Props & PropWithClass) {
	return (
		<div className={className}>
			<div className="flex  gap-2 ">
				<div className="w-[1px] h-[40px] mr-4 bg-slate-700 my-auto "></div>
				<span className="text-sm my-auto">{name}</span>

				<img
					className="rounded-full  object-cover shadow w-12 mx-2"
					src={src}
					alt=""
				/>
			</div>
		</div>
	)
}
