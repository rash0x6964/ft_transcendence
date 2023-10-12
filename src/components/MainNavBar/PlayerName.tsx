import React from 'react'
import PropWithClass from '@/types/PropWithClass'
import Avatar from '../BaseComponents/Avatar'
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
				<span className="text-sm my-auto mr-2">{name}</span>

				<Avatar onClick={()=>{}} src={src} alt={name} className='w-12 h-12' />

			</div>
		</div>
	)
}
