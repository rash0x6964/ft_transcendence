import Image from "next/image"

type Props = {
  className?: string
  src: string
  alt?: string
  onClick?: () => void
  override?: boolean
  OnError?: (e: any) => void
}

export default function Avatar({
  className,
  src,
  alt = "haha",
  onClick,
  override = false,
  OnError,
}: Props) {
<<<<<<< HEAD
  return (
    <Image
      onClick={onClick}
      className={` ${!override && "rounded-full"} ${
        onClick && " transition-opacity cursor-pointer hover:opacity-50"
      }  object-cover   drop-shadow-lg  ${className}`}
      src={src}
      alt={alt}
      width={250}
      height={250}
	  onError={OnError}
    />
  )
=======
	return (
		<Image
			onClick={onClick}
			className={` ${!override && "rounded-full"} ${onClick && ' transition-opacity cursor-pointer hover:opacity-50'}  object-cover   drop-shadow-lg  ${className}`}
			src={src}
			alt={alt}
			width={250}
			height={250}
		/>
	)
>>>>>>> cc62baeb6f78e26450e61d784940caf19c9c3a8e
}
