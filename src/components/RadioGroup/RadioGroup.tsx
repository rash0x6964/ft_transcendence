import React, { useEffect, useState } from "react"
import RadioButton from "@/components/RadioGroup/RadioButton"

type Props = {
  disabled?: boolean
  radios: string[]
  value: string
  className?: string
  glow?: boolean
  onChange?: (value: string) => void
}
export default function RadioGroup({
  radios,
  value,
  className,
  onChange,
  glow = false,
  disabled = false,
}: Props) {
  const radiosSet: string[] = Array.from(new Set(radios))
  const handleChange = (value: string) => {
    onChange && onChange(value)
  }

  return (
    <div className={`${className}  ${disabled ? "opacity-70" : ""}`}>
      {radiosSet.map((val, i) => {
        return (
          <RadioButton
            disabled={disabled}
            key={"radios-" + i}
            onClick={handleChange}
            label={val}
            value={val}
            glow={glow}
            selected={value == val}
          />
        )
      })}
    </div>
  )
}
