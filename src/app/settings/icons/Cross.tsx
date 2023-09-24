"use client"
import { useRouter } from "next/navigation"
import React from "react"

export default function Cross() {
  const router = useRouter()
  const handleClick: () => void = () => {
    const path: string | null = localStorage.getItem("pathBeforeSetting")
	localStorage.removeItem("pathBeforeSetting")
	if (path)
		router.push(path)
	else
		router.push("/")
  }

  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick}
      className="cursor-pointer"
    >
      <path
        d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z"
        stroke="#D1D5DB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.75 11.25L11.25 18.75"
        stroke="#D1D5DB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 11.25L18.75 18.75"
        stroke="#D1D5DB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
