import Image from "next/image"
import { useState } from "react"
import env from "@/environment/environment"
import Link from "next/link"
import { link } from "fs"

type Props = {
  className?: string
  src?: string
  alt?: string
  onClick?: () => void
  href?: string
  override?: boolean
}

export default function Avatar({
  className,
  src,
  alt = "",
  onClick,
  href = "",
  override = false,
}: Props) {
  const [imgSrc, setImgSrc] = useState(src ?? "/err.png")
  if (href == "")
    return (
      <Image
        onClick={onClick}
        className={` bg-gray-300 ${!override && "rounded-full"} ${
          onClick && " transition-opacity cursor-pointer hover:opacity-50"
        }  object-cover   drop-shadow-lg  ${className}`}
        src={imgSrc}
        alt={alt}
        onError={() => setImgSrc("/err.png")}
        width={250}
        height={250}
      />
    )
  return (
    <Link href={href}>
      <Image
        onError={() => setImgSrc("/err.png")}
        onClick={onClick}
        className={`bg-gray-300 ${
          !override && "rounded-full"
        } ${" transition-opacity cursor-pointer hover:opacity-50"}  object-cover   drop-shadow-lg  ${className}`}
        src={imgSrc}
        alt={alt}
        width={250}
        height={250}
      />
    </Link>
  )
}
