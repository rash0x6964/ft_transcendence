import SvgProps from "@/types/SvgProps"

export default function Check({ width, height, className }: SvgProps) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			fill="none"
			viewBox="0 0 14 10"
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M12.333 1L5 8.333 1.667 5"
			></path>
		</svg>
	)
}
