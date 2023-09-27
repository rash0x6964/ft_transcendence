import React from "react"
import SvgProps from "@/types/SvgProps"
export default function RP({ className, width = 24, height = 24 }: SvgProps) {
	return (
		<svg className={className}
			width={width}
			height={height}
			viewBox="0 0 22 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M10.8817 18.3984L3.91315 15.1172V1.60156H17.9356V15.1172L10.8817 18.3984ZM4.59592 14.7367L10.8817 17.6953L17.2528 14.7359V2.22656H4.59592V14.7367ZM10.8501 13.4438L6.81067 11.5418V13.4949L10.845 15.3941L15.0385 13.4453V11.4961L10.8501 13.4438Z"
				fill="currentColor"
			/>
		</svg>
	)
}
