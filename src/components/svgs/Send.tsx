import React from 'react'
import SvgProps from '@/types/SvgProps'

export default function Send({ width, height, className }: SvgProps) {
	return (
		<svg className={className} width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M2.5 2.5L5 10L2.5 17.5L18.3333 10L2.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M5 10H18.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>


	)
}
