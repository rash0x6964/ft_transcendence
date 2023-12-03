import Info from "@/components/svgs/Info"
import React from "react"
type Props = {
  className?: string
  selected: Boolean
  gameMod: string
  img: string
  onClick: () => void
  onInfoClick?: () => void
  disabled: boolean
}

export default function GameModButton({
  className,
  selected,
  gameMod,
  img,
  onClick,
  onInfoClick,
  disabled = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-44 h-16 rounded-xl relative duration-500 ${
        !disabled ? " hover:border-primary " : "cursor-default"
      }  border-2 ${className} ${
        selected ? "border-primary" : "border-transparent"
      }  `}
    >
      <img
        src={img}
        className="top-0 left-0 absolute object-cover w-full h-full  rounded-xl"
        alt={gameMod}
      />

      <div
        className={`w-full h-full rounded-xl top-0 left-0 blur  absolute border-2 border-primary  ${
          selected ? "border-primary" : "border-transparent"
        } `}
      ></div>

      <div
        className={`w-full h-full rounded-xl flex flex-col justify-center top-0 left-0   absolute bg-gray-900/60 `}
      >
        <button
          onClick={onInfoClick}
          className="absolute right-0 top-0 m-1  hover:text-white/50  text-white "
        >
          <Info width={20} height={20} className="opacity-100" />
        </button>
        <h1 className=" w-full   text-xs ">{gameMod}</h1>
      </div>
    </button>
  )
}
