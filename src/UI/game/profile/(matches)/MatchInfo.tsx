type Props = {
  type: "Normal" | "Ranked"
  win: boolean
  days: number
}

export default function MatchInfo({ type, win, days }: Props) {
  const outcome = win ? "Win" : "Loss"
  let className = win ? "text-emerald-600" : "text-red-600"
  let daysMessage = `${days} Days ago`

  if (days === 0) daysMessage = "Today"
  else if (days === 1) daysMessage = "1 Day ago"

  return (
    <div className="flex justify-between flex-col items-center">
      <h3 className="font-semibold text-sm">{type}</h3>
      <h6 className="text-gray-400 text-xs">{daysMessage}</h6>
      <h5 className={className + " text-sm"}>{outcome}</h5>
    </div>
  )
}
