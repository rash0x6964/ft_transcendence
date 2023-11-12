import React, { useEffect, useState } from "react"
import RadioButton from "@/components/RadioGroup/RadioButton"

type Props = {
  disabled?: boolean
  radios: string[]
  defaultVal: string
  className?: string
  glow?: boolean
  onChange?: (value: string) => void
}
export default function RadioGroup({
  radios,
  defaultVal,
  className,
  onChange,
  glow = false,
  disabled = false,
}: Props) {

  const [selectedVal, setSelectedVal] = useState(defaultVal)

  let radiosSet: string[] = Array.from(new Set(radios))
  const handleChange = (value: string) => {
    onChange && onChange(value)
    setSelectedVal(value)
  }

  return (
    <div className={`${className}  ${disabled ? "opacity-70" : ""}`}>
      {radios.map((val, i) => {
        return (
          <RadioButton
            disabled={disabled}
            key={"radios-" + i}
            onClick={handleChange}
            label={val}
            value={val}
            glow={glow}
            selected={
              selectedVal == val ||
              (selectedVal == "Protected" && val == "Public")
            }
          />
        )
      })}
    </div>
  )
}
