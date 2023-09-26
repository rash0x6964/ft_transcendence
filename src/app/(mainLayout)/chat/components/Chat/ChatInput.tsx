import React from "react"

type Props = {
  placeholder: string
  type?: string
  className?: string
  icon?: React.ReactNode
}

export default function Input({
  placeholder,
  className,
}: Props) {
  return (
    <div className={`rounded-xl text-sm font-normal flex  justify-between   px-5 ${className}`}>
      <input
        className="  appearance-none my-auto h-fit w-full outline-none text-slate-300 bg-transparent placeholder-slate-700"
        placeholder={placeholder}
        type="text"
      />
    </div>
  )
}
