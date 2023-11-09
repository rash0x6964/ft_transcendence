"use client"
import React from "react"
import SvgProps from "@/types/SvgProps"

export default function Cross({ width, height, className, onClick }: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 30 30"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    >
      <path
        stroke="#D1D5DB"
        d="M15 27.5c6.904 0 12.5-5.596 12.5-12.5S21.904 2.5 15 2.5 2.5 8.096 2.5 15 8.096 27.5 15 27.5zM18.75 11.25l-7.5 7.5M11.25 11.25l7.5 7.5"
      ></path>
    </svg>
  )
}
