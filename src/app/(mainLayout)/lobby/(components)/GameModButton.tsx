'use client'
import React from 'react'
type Props =
	{
		className?: string
		selected: Boolean
		gameMod: string
		img: string
		onClick: () => void

	}
export default function ({ className, selected, gameMod, img ,onClick }: Props) {
	return (
		<button onClick={onClick} className={`w-44 h-16 rounded-xl relative duration-500 hover:border-primary border-2 ${className} ${selected ? 'border-primary' : 'border-transparent'}  `} >
			<img src={img} className='top-0 left-0 absolute object-cover w-full h-full  rounded-xl' alt={gameMod} />
			<div className={`w-full h-full rounded-xl top-0 left-0 blur  absolute border-2 border-primary  ${selected ? 'border-primary' : 'border-transparent'} `} >
			</div>
			<div className={`w-full h-full rounded-xl flex flex-col justify-center top-0 left-0   absolute bg-gray-900/60 `} >
				<h1 className=' w-full   text-xs '>{gameMod}</h1>
			</div>
		</button>
	)
}
