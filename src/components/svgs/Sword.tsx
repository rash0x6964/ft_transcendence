import React from 'react'
import SvgProps from '@/types/SvgProps'
export default function Sword({ width, height, className }: SvgProps) {
	return (
		<svg className={className} width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clipPath="url(#clip0_113_1376)">
				<path d="M12.0833 14.5833L2.5 5V2.5H5L14.5833 12.0833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M10.8333 15.8335L15.8333 10.8335" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M13.3333 13.3335L16.6666 16.6668" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M15.8333 17.5002L17.5 15.8335" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</g>
			<defs>
				<clipPath id="clip0_113_1376">
					<rect width="20" height="20" fill="currentColor" />
				</clipPath>
			</defs>
		</svg>
	)
}
