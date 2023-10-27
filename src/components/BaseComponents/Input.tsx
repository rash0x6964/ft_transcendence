import React from "react"
import Test from "../svgs/Menu"

type Props = {
  placeholder: string
  type?: string
  className?: string
  icon?: React.ReactNode
<<<<<<< HEAD
  value: string
  onChange?: (e: any) => void
  autoFocus?: boolean
=======
  onChange?:(e:React.ChangeEvent<HTMLInputElement>) => void
  value?:string
  autoFocus?:boolean
>>>>>>> cc62baeb6f78e26450e61d784940caf19c9c3a8e
}

export default function Input({
  placeholder,
  className,
  type = "text",
  icon,
<<<<<<< HEAD
  value = "",
  onChange,
  autoFocus,
}: Props) {
  return (
    <div
      className={`rounded-xl text-sm font-normal flex  justify-between  w-80 px-5 ${className}`}
    >
      <input
        autoFocus={autoFocus}
        className=" w-[85%]  appearance-none my-auto h-fit outline-none text-slate-300 bg-transparent placeholder-slate-700"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
=======
  onChange,
  value,
  autoFocus
}: Props) {
  return (
    <div className={`rounded-xl text-sm font-normal flex  justify-between  w-80 px-5 ${className}`}>
      <input autoFocus={autoFocus} onChange={onChange} value={value}
        className="  appearance-none my-auto h-fit outline-none text-slate-300 bg-transparent placeholder-slate-700"
        placeholder={placeholder}
        type={type}
>>>>>>> cc62baeb6f78e26450e61d784940caf19c9c3a8e
      />
      <div className=" my-auto">{icon || <Test />}</div>
    </div>
  )
}
