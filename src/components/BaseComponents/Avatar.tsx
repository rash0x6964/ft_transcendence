import Image from "next/image"
import { useEffect, useState } from "react"
import env from "@/constants/constants"
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
  const [error, setError] = useState(false)
  useEffect(() => {
    setError(false)
  }, [src])
  if (href == "")
    return (
      <Image
        onClick={onClick}
        className={` bg-gray-300 ${!override && "rounded-full"} ${
          onClick && " transition-opacity cursor-pointer hover:opacity-50"
        }  object-cover   drop-shadow-lg  ${className}`}
        src={error ? "/assets/err.png" : src ?? "/assets/err.png"}
        alt={alt}
        onError={() => setError(true)}
        width={250}
        height={250}
        title={alt}
      />
    )
  return (
    <Link href={href}>
      <Image
        onError={() => setError(true)}
        onClick={onClick}
        className={`bg-gray-300 ${
          !override && "rounded-full"
        } ${" transition-opacity cursor-pointer hover:opacity-50"}  object-cover   drop-shadow-lg  ${className}`}
        src={error ? "/assets/err.png" : src ?? "/assets/err.png"}
        alt={alt}
        width={250}
        height={250}
      />
    </Link>
  )
}
