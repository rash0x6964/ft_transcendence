import React from "react"
import MatchHistory from "../svgs/MatchHistory"
import Match from "@/models/Match.model"

type Props = {
  id: string
  matches: Match[]
  className?: string
}

type historyState = "win" | "loss" | "n/a"

export default function NavHistory({ matches, className, id }: Props) {
  const history: historyState[] = ["n/a", "n/a", "n/a", "n/a", "n/a"]
  matches.map((match, index) => {
    match.winnerID === id ? (history[index] = "win") : (history[index] = "loss")
  })

  return (
    <div className={className}>
      <div className="flex  gap-1 ">
        <MatchHistory className="my-auto" />
        {history.map((x, i) => {
          let color
          switch (x) {
            case "win":
              color = "bg-emerald-500"
              break
            case "loss":
              color = "bg-red-500"
              break
            case "n/a":
              color = "bg-gray-500"
              break
          }
          return (
            <div
              key={i}
              className={`w-[11px] h-[14px] my-auto rounded-sm ${color}`}
            ></div>
          )
        })}
      </div>
    </div>
  )
}
