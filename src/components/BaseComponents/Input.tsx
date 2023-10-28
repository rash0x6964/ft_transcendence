import React from "react"
import Test from "../svgs/Menu"

type Props = {
  placeholder: string
  type?: string
  className?: string
  icon?: React.ReactNode
  onChange?:(e:React.ChangeEvent<HTMLInputElement>) => void
  value:string
  autoFocus?:boolean
}

export default function Input({
  placeholder,
  className,
  type = "text",
  icon,
  onChange,
  value = "",
  autoFocus
}: Props) {
  return (
    <div className={`rounded-xl text-sm font-normal flex  justify-between  w-80 px-5 ${className}`}>
      <input autoFocus={autoFocus} onChange={onChange} value={value}
        className="  appearance-none my-auto h-fit outline-none text-slate-300 bg-transparent placeholder-slate-700"
        placeholder={placeholder}
        type={type}
      />
      <div className=" my-auto">{icon || <Test />}</div>
    </div>
  )
}
