import { type } from "os"
import React from "react"
import Test from "../svgs/Pen"

type Props = {
  placeholder: string
  type?: string
  className?: string
  icon?: React.ReactNode
}

export default function Input({
  placeholder,
  className,
  type = "text",
  icon,
}: Props) {
  return (
    <div
      className={`rounded-xl flex py-4 justify-between bg-secondary w-80 px-5 ${className}`}
    >
      <input
        className=" appearance-none outline-none text-slate-300 bg-transparent placeholder-slate-700"
        placeholder={placeholder}
        type={type}
      />
      {icon || <Test />}
    </div>
  )
}
