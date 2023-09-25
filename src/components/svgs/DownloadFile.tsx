import React from 'react'
import SvgProps from '@/types/SvgProps'
export default function DownloadFile({width,height,className} : SvgProps) {
	return (
		<svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 2v8M16 6l-4 4-4-4M20 14H4a2 2 0 00-2 2v4a2 2 0 002 2h16a2 2 0 002-2v-4a2 2 0 00-2-2zM6 18h.01M6 18h.01"
      ></path>
    </svg>

	)
}
