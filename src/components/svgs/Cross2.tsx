import SvgProps from "@/types/SvgProps"

export default function Cross2({width,height,className}:SvgProps) {
	return (
		<svg className={className}
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
				d="M12 4l-8 8M4 4l8 8"
			></path>
		</svg>
	)
}
