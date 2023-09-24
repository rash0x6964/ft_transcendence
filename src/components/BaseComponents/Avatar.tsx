import React from 'react'

type Props = {
	className?: string,
	src: string,
	alt?: string,
	onClick?: () => void
}

export default function Avatar({ className, src, alt, onClick }: Props) {
	return (
		<img onClick={onClick}
			className={`rounded-full  object-cover   drop-shadow-lg  ${className}`}
			src={src}
			alt={alt}
		></img>
	)
}
