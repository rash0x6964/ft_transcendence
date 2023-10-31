import MatchDisplayData from "@/types/MatchDisplayData"

type Props = {
  match: MatchDisplayData
}

export default function Score({ match }: Props) {
  const score_one = match.s_1
  const score_two = match.s_2
  const minutes = 15

  return (
    <div className="flex flex-col items-center">
      <h4 className="p-1 text-xl font-semibold">{`${score_one} - ${score_two}`}</h4>
      <p className="text-xs font-semibold text-gray-400">{minutes} min</p>
    </div>
  )
}
