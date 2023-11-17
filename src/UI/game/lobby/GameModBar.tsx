import React from "react"
import { useState } from "react"
import GameModButton from "./GameModButton"
import GameMod from "@/types/GameMod"

type Props = {
  gameMods: GameMod[]
  value: string
  onChange?: (gameModName: string) => void
  className?: string
  disabled?: boolean
}
export default function GameModBar({
  gameMods,
  value,
  onChange,
  className,
  disabled = false,
}: Props) {
  const handleChange = (gameModName: string) => {
    onChange && onChange(gameModName)
  }

  return (
    <div
      className={`flex flex-col   rounded-xl px-3 pt-3 border shadow border-[#4D4D4D] ${
        disabled ? "opacity-50" : ""
      }  ${className}`}
    >
      <div className="flex gap-5 mb-2">
        {gameMods.map((gameMod, i) => {
          return (
            <GameModButton
              disabled={disabled}
              onClick={() => {
                !disabled && handleChange(gameMod.name)
              }}
              key={"gameMod-" + i}
              gameMod={gameMod.name}
              img={gameMod.src}
              selected={gameMod.name == value}
            />
          )
        })}
      </div>
      <span className="text-center text-xs font-medium mb-1"> Game Mod</span>
    </div>
  )
}
