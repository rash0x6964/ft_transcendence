import React from "react"
import SvgProps from "@/types/SvgProps"

export default function UnblockAtList({
  width,
  height,
  className,
  onClick,
}: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 16 16"
			className={className}
			onClick={onClick}
    >
      <path
        stroke="#D1D5DB"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 4l-8 8M4 4l8 8"
      ></path>
    </svg>
  )
}
