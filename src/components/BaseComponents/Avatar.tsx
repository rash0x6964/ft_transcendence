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
  if (href == "")
    return (
      <Image
        onClick={onClick}
        className={` ${!override && "rounded-full"} ${
          onClick && " transition-opacity cursor-pointer hover:opacity-50"
        }  object-cover   drop-shadow-lg  ${className}`}
        src={src || "https://steamavatar.io/img/1477742944DNm1y.jpg"}
        alt={alt}
        width={250}
        height={250}
      />
    )
  return (
    <Link href={href}>
      <Image
        onClick={onClick}
        className={` ${
          !override && "rounded-full"
        } ${" transition-opacity cursor-pointer hover:opacity-50"}  object-cover   drop-shadow-lg  ${className}`}
        src={src || "https://steamavatar.io/img/1477742944DNm1y.jpg"}
        alt={alt}
        width={250}
        height={250}
      />
    </Link>
  )
}
