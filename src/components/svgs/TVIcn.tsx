import React from "react"
import SvgProps from "@/types/SvgProps"

function TVIcn({ width, height, className }: SvgProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 20 20"
    >
      <g
        stroke="#D1D5DB"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        clipPath="url(#clip0_130_14)"
      >
        <path d="M16.666 5.833H3.333c-.92 0-1.667.747-1.667 1.667v9.167c0 .92.747 1.666 1.667 1.666h13.334c.92 0 1.666-.746 1.666-1.666V7.5c0-.92-.746-1.667-1.666-1.667zM14.167 1.667L10 5.833 5.833 1.666"></path>
      </g>
      <defs>
        <clipPath id="clip0_130_14">
          <path fill="#fff" d="M0 0H20V20H0z"></path>
        </clipPath>
      </defs>
    </svg>
  )
}

export default TVIcn
