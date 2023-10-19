type Props = {
  type: "Normal" | "Ranked"
  win: boolean
  days: number
}

export default function MatchInfo({ type, win, days }: Props) {
  const outcome = win ? "Win" : "Loss"
  let className = win ? "text-emerald-600" : "text-red-600"

  return (
    <div className="flex justify-between flex-col items-center">
      <h3 className="font-semibold text-sm">{type}</h3>
      <h6 className="text-gray-400 text-xs">{days} Days ago</h6>
      <h5 className={className + " text-sm"}>{outcome}</h5>
    </div>
  )
}
