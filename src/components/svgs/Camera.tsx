import SvgProps from "@/types/SvgProps"

export default function Camera({width,height,className} : SvgProps) {
	return (
		<svg
		className={className}
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			fill="none"
			viewBox="0 0 50 50"
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M30.208 8.334H19.792l-5.209 6.25h-6.25a4.167 4.167 0 00-4.167 4.166V37.5a4.167 4.167 0 004.167 4.167h33.334a4.167 4.167 0 004.166-4.167V18.75a4.167 4.167 0 00-4.166-4.166h-6.25l-5.209-6.25z"
			></path>
			<path
				stroke="url(#paint0_linear_130_17)"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M25 33.334a6.25 6.25 0 100-12.5 6.25 6.25 0 000 12.5z"
			></path>
			<defs>
				<linearGradient
					id="paint0_linear_130_17"
					x1="25"
					x2="25"
					y1="20.834"
					y2="33.334"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#0A0E12"></stop>
					<stop offset="1" stopColor="#15222C"></stop>
				</linearGradient>
			</defs>
		</svg>
	)
}
