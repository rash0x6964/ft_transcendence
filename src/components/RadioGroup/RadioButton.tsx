import React from 'react'

type Props =
	{
		disabled?: boolean
		value?: string,
		onClick?: (value: string) => void
		label?: string
		selected?: boolean
		glow?: Boolean
	}
export default function RadioButton({ value = "", onClick, label, selected = false, glow = true, disabled = false }: Props) {

	return (
		<div onClick={() => { (!disabled && onClick) && onClick(value) }} className=' flex gap-2 group'>

			<div className={`${!disabled ? "cursor-pointer" : ""} bg-gradient-to-br from-40% bg-gradient-t from-backdrop to-mirage w-5  h-5 border border-[#4D4D4D] rotate-45 flex justify-center items-center m-2 relative`}>
				{glow && <div className={`transition-colors my-auto w-2 h-2 absolute blur-[2px]  ${!disabled ? "group-hover:bg-primary" : ""}  ${selected ? 'bg-primary' : 'bg-transparent'} `}>
				</div>}
				<div className={`my-auto w-2 h-2  transition-colors  bg-primary  ${!disabled ? "group-hover:bg-primary" : ""}   ${selected ? 'bg-primary' : 'bg-transparent'} `}>
				</div>
			</div>

			<div className='my-auto text-sm'>{label}</div>
		</div>
	)
}
