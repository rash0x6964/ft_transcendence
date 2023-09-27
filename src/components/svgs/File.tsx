import React from 'react'
import SvgProps from '@/types/SvgProps'
export default function File({ width, height, className }: SvgProps) {
	return (
		<svg className={className} width={width} height={height} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M18.125 2.5H7.5C6.83696 2.5 6.20107 2.76339 5.73223 3.23223C5.26339 3.70107 5 4.33696 5 5V25C5 25.663 5.26339 26.2989 5.73223 26.7678C6.20107 27.2366 6.83696 27.5 7.5 27.5H22.5C23.163 27.5 23.7989 27.2366 24.2678 26.7678C24.7366 26.2989 25 25.663 25 25V9.375L18.125 2.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M17.5 2.5V10H25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>

	)
}
