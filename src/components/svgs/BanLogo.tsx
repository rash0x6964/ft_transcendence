import React from "react"
import SvgProps from "@/types/SvgProps"

export default function BanLogo({
  width,
  height,
  className,
  onClick,
}: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      onClick={onClick}
    >
      <path
        stroke="#D1D5DB"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM8 11h.01M12 11h.01M16 11h.01"
      ></path>
    </svg>
  )
}
