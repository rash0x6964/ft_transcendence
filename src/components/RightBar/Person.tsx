import Image from "next/image"
import React from "react"

type Props = {
  userName: string
  state: string
}

export default function Person({ userName, state }: Props) {
  return (
    <div className="w-9 relative flex flex-col items-center">
      <img
        className="rounded-full border-2 w-9"
        src="https://steamavatar.io/img/147774149680437.jpg"
        alt="Avatar"
      />
      <div
        className={
          "bg-green-400 rounded-full w-2 h-2 absolute z-20 right-1 top-7 " +
          state
        }
      ></div>
      <span className="text-xs">{userName}</span>
    </div>
  )
}
