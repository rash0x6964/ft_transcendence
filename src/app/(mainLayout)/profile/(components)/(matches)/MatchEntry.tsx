import Match from "../../(types)/Match"
import MatchInfo from "./MatchInfo"
import ScoreBoard from "./ScoreBoard"

type Props = {
  match: Match
}

export default function MatchEntry({ match }: Props) {
  return (
    <div className="bg-secondary drop-shadow-lg rounded-2xl m-4 flex gap-5 p-3 h-[90px] max-w-[1044px]">
      <MatchInfo type={match.type} win={match.win} days={match.days} />
      <div className="bg-gray-700 h-16 my-auto w-[1px]" />
      <ScoreBoard match={match} />
    </div>
  )
}
