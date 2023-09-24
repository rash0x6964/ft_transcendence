"use client"

import React, { PropsWithChildren } from "react"
type Props = {
  onClick?: () => void
  glow?: Boolean
  className?: string
}
export default function MainButton({
  onClick,
  glow = false,
  children,
  className,
}: Props & PropsWithChildren) {
  return (
    <button className={"w-fit relative  group "} onClick={onClick}>
      {glow && (
        <div
          className={`  bg-primary transition-all duration-300  group-hover:blur-[4px] w-full h-full rounded-md absolute top-0 left-0 blur-[0px] `}
        ></div>
      )}

      <div
        className={`w-full h-full bg-primary duration-300 hover:bg-primary/70 relative  text-sm font-semibold  text-secondary rounded-md text-center ${className} `}
      >
        {children}
      </div>
    </button>
  )
}
