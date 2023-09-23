type Props = {
  type: "Normal" | "Ranked"
  win: boolean
  days: number
}

export default function MatchInfo({ type, win, days }: Props) {
  const outcome = win ? "Win" : "Loss"
  let className = win ? "text-emerald-600" : "text-red-600"
  className += " font-semibold"

  return (
    <>
      <div className="flex flex-col items-center">
        <h3 className="font-semibold">{type}</h3>
        <h6 className="text-gray-400">{days} Days ago</h6>
        <h5 className={className}>{outcome}</h5>
      </div>
    </>
  )
}
