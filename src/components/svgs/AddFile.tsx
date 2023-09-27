import React from 'react'
import SvgProps from '@/types/SvgProps'
export default function AddFile({ width, height, className }: SvgProps) {
	return (
		<svg className={className} width={width} height={height}viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12.0833 1.6665H4.99998C4.55795 1.6665 4.13403 1.8421 3.82147 2.15466C3.50891 2.46722 3.33331 2.89114 3.33331 3.33317V16.6665C3.33331 17.1085 3.50891 17.5325 3.82147 17.845C4.13403 18.1576 4.55795 18.3332 4.99998 18.3332H15C15.442 18.3332 15.8659 18.1576 16.1785 17.845C16.4911 17.5325 16.6666 17.1085 16.6666 16.6665V6.24984L12.0833 1.6665Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M11.6667 1.6665V6.6665H16.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M10 15V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M7.5 12.5H12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>

	)
}
