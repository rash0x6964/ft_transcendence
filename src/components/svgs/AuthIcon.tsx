import SvgProps from "@/types/SvgProps"

export default function AuthIcon({ width, height, className }: SvgProps) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			fill="none"
			viewBox="0 0 72 72"
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.563"
				d="M31.47 6.69L16.5 12.3c-3.45 1.29-6.27 5.37-6.27 9.06v22.29c0 3.54 2.34 8.19 5.19 10.32l12.9 9.63c4.23 3.18 11.19 3.18 15.42 0l12.9-9.63c2.85-2.13 5.19-6.78 5.19-10.32V21.36c0-3.69-2.82-7.77-6.27-9.06L40.59 6.69c-2.55-.93-6.63-.93-9.12 0z"
			></path>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.563"
				d="M36 32.76h-.39c-2.82-.09-5.07-2.43-5.07-5.28 0-2.91 2.37-5.28 5.28-5.28s5.28 2.37 5.28 5.28c-.03 2.88-2.28 5.19-5.1 5.28zM30.03 41.16c-2.88 1.92-2.88 5.07 0 6.99 3.27 2.19 8.64 2.19 11.91 0 2.88-1.92 2.88-5.07 0-6.99-3.24-2.19-8.61-2.19-11.91 0z"
			></path>
		</svg>
	)
}
