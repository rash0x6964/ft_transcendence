import { useRouter } from "next/router"
import React, { Children, PropsWithChildren, useEffect } from "react"
import { useState } from "react"

type Props = {
  closed?: boolean
  onBackDropClick?: () => void
}

export default function Dialogue({
  onBackDropClick,
  closed = true,
  children,
}: Props & PropsWithChildren) {
  const router = useRouter()

  useEffect(() => {
    let handler = (event: any) => {
      event.preventDefault()
      if (event.key == "Escape") onBackDropClick && onBackDropClick()
    }
    window.addEventListener("keydown", handler)

    onBackDropClick && onBackDropClick()
    return () => {
      window.removeEventListener("keydown", handler)
    }
  }, [router])
  return (
    <div
      className={`h-screen w-screen  z-50 fixed left-0 top-0  flex flex-col justify-center   ${
        closed ? "hidden" : "block"
      }`}
    >
      <div
        onClick={onBackDropClick}
        className=" z-40  fixed bg-backdrop/90 backdrop-blur-sm w-screen h-screen flex flex-col justify-center "
      ></div>
      <div className="mx-auto  z-50 ">{!closed && children}</div>
    </div>
  )
}
