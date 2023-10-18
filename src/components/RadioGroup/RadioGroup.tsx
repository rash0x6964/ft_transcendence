
import React, { useState } from 'react'
import RadioButton from '@/components/RadioGroup/RadioButton'

type Props =
	{
		radios: string[]
		defaultVal: string
		className?: string
		glow?: boolean
		onChange?: (value: string) => void

	}
export default function RadioGroup({ radios, defaultVal, className, onChange, glow = false }: Props) {
	let radiosSet: string[] = Array.from(new Set(radios));
	const handleChange = (value: string) => {
		onChange && onChange(value);
		setSelectedVal(value);
	}
	const [selectedVal, setSelectedVal] = useState(defaultVal);
	return (
		<div className={className}>
			{radios.map((val, i) => {
				return <RadioButton key={"radios-" + i} onClick={handleChange} label={val} value={val} glow={glow} selected={selectedVal === val} />;
			})}

		</div>
	)
}
