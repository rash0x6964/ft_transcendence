import Image from "next/image"

type Props = {
	className?: string
	src: string
	alt?: string
	onClick?: () => void,
	override?: boolean
}

export default function Avatar({
	className,
	src,
	alt = "haha",
	onClick,
	override = false
}: Props) {
	return (
		<Image
			onClick={onClick}
			className={` ${!override && "rounded-full"} ${onClick && ' transition-opacity cursor-pointer hover:opacity-50'}  object-cover   drop-shadow-lg  ${className}`}
			src="https://media.tenor.com/0hciLENrqi8AAAAC/neon-steam.gif"
			alt={alt}
			width={250}
			height={250}
		/>
	)
}
