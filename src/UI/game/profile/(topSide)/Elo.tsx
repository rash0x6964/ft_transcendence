import Badge from "@/components/svgs/Badge"
import React from "react"

type Props = {
  RP: number
  className?: string
}
export default function Elo({ RP, className }: Props) {
  return (
    <div className={className}>
      <div className="flex gap-2">
        <Badge className="my-auto" />
        <div className="text-base font-semibold my-auto">{`${RP} `}RP</div>
      </div>
    </div>
  )
}
