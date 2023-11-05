import Image from "next/image"
import { useState } from "react"
import env from "@/environment/environment"

type Props = {
  className?: string
  src?: string
  alt?: string
  onClick?: () => void
  override?: boolean
}

export default function Avatar({
  className,
  src,
  alt = "haha",
  onClick,
  override = false,
}: Props) {
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
}
