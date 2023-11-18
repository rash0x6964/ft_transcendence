import SvgProps from "@/types/SvgProps"
import React from "react"

function PendingReq({ width, height, className }: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
			className={className}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill="white"
        d="M9 2a4 4 0 100 8 4 4 0 000-8zM6 6a3 3 0 116 0 3 3 0 01-6 0zm-1.991 5A2.001 2.001 0 002 13c0 1.691.833 2.966 2.135 3.797C5.417 17.614 7.145 18 9 18c.41 0 .816-.019 1.21-.057a5.501 5.501 0 01-.618-.958C9.398 16.995 9.2 17 9 17c-1.735 0-3.257-.364-4.327-1.047C3.623 15.283 3 14.31 3 13c0-.553.448-1 1.009-1h5.59c.184-.358.405-.693.658-1H4.01zm9.866 1.5a.625.625 0 111.25 0 .625.625 0 01-1.25 0zm1.125 4a.5.5 0 01-1 0v-2a.5.5 0 011 0v2zm-5-2a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zm1 0a3.5 3.5 0 107 0 3.5 3.5 0 00-7 0z"
      ></path>
    </svg>
  )
}

export default PendingReq
