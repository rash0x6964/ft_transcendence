import React from "react"

type Props = {
	placeholder: string
	type?: string
	className?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	onKeyEnter?: () => void
	icon?: React.ReactNode,
	value: string
}

export default function Input({
	onChange,
	value,
	placeholder,
	className,
	onKeyEnter
}: Props) {

	const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key == 'Enter')
			onKeyEnter && onKeyEnter();
	}
	return (
		<div className={`rounded-xl text-sm font-normal flex  justify-between   px-5 ${className}`}>
			<input autoFocus={true} onKeyDown={handleKeyEnter} onChange={onChange}
				className="  appearance-none my-auto h-fit w-full outline-none text-slate-300 bg-transparent placeholder-slate-700"
				placeholder={placeholder}
				value={value}
				type="text"
			/>
		</div>
	)
}
