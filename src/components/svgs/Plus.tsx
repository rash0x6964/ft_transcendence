
import SvgProps from "@/types/SvgProps"

export default function Plus({ width, height, className }: SvgProps) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			fill="none"
			viewBox="0 0 16 16"
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M3.333 8h9.334M8 3.333v9.334"
			></path>
		</svg>

	)
}
