import SvgProps from "@/types/SvgProps"

export default function FriendCheck({className,width,height}:SvgProps) {
	return (
		<svg

			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="3"
			className={className}
			viewBox="0 0 24 24"
		>
			<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"></path>
			<circle cx="9" cy="7" r="4"></circle>
			<path d="M16 11L18 13 22 9"></path>
		</svg>
	)
}
