import SvgProps from "@/types/SvgProps"

export default function MailLetter({ className, width, height }: SvgProps) {
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
				d="M13.333 2.667H2.667c-.737 0-1.334.596-1.334 1.333v8c0 .736.597 1.333 1.334 1.333h10.666c.737 0 1.334-.597 1.334-1.333V4c0-.737-.597-1.333-1.334-1.333z"
			></path>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M14.667 4.667l-5.98 3.8a1.293 1.293 0 01-1.374 0l-5.98-3.8"
			></path>
		</svg>
	)
}
