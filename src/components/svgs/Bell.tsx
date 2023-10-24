import SvgProps from "@/types/SvgProps"

export default function Bell({ width, height, className }: SvgProps) {
	return (
		<svg
			widths={width}
			height={height}
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			fill="none"
			viewBox="0 0 20 20"
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M5 6.667a5 5 0 1110 0c0 5.833 2.5 7.5 2.5 7.5h-15S5 12.5 5 6.666zM8.583 17.5a1.617 1.617 0 002.834 0"
			></path>
		</svg>
	)
}
