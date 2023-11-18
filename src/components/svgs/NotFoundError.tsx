import React from "react"
import SvgProps from "@/types/SvgProps"

function NotFoundError({ width, height, className }: SvgProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      x="0"
      y="0"
      fill="#9BECE3"
      version="1.1"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm6.38 16.62l-1.77 1.77L12 13.77l-4.62 4.62-1.77-1.77L10.23 12 5.62 7.38l1.77-1.77L12 10.23l4.62-4.62 1.77 1.77L13.77 12l4.61 4.62z"></path>
    </svg>
  )
}

export default NotFoundError
