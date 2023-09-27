import React from 'react'
import SvgProps from '@/types/SvgProps'
export default function Eye ({width,height,className}:SvgProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			fill="none"
			viewBox="0 0 10 10"
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M.833 5S2.083 2.083 5 2.083 9.167 5 9.167 5 7.917 7.917 5 7.917.833 5 .833 5z"
			></path>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M5 6.25a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
			></path>
		</svg>
	)
}
