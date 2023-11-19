import React from "react"
import PropWithClass from "@/types/PropWithClass"
export default function TableHead({ className }: PropWithClass) {
  return (
    <div className={` ${className} grid grid-cols-10`}>
      <div className="self-center pr-10 col-span-2">Rank</div>
      <div className="self-center col-span-2 "> Player </div>
      <div className="self-center  col-span-2">Rating</div>
      <div className="self-center col-span-2">Winrate</div>
      <div className="self-center col-span-2">Game</div>
    </div>
  )
}
